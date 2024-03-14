import { INVOICE_TABLE_DATA_MOCK } from './mock';
import { InvoiceResponse, InvoicesOperation, Filter } from '../types';

const domain = process.env.SERVER_DOMAIN;
const GRAPHQL_API_ENDPOINT = '/api/v1/graphql.json';
const endpoint = `${domain}${GRAPHQL_API_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;
const key = process.env.ACCESS_TOKEN!;

export async function graphqlFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ body: T } | never> {
  try {
    const result = await fetchMock(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
    });

    if (result.errors) {
      throw result.errors[0];
    }

    return {
      body: result.data
    };
  } catch (e) {
    throw {
      error: e,
      query
    };
  }
}

// mocking request - using any to enable generic to work later
const fetchMock = async (endpoint: string, options: RequestInit): Promise<{ data: any; errors?: Array<Error>}> => {

  return new Promise((resolve, reject) => {
      resolve({ data: { data: INVOICE_TABLE_DATA_MOCK } });
      // reject(new Error('ERROR!'))
  });
}



export async function getInvoices(
  dateFrom: number,
  dateTo: number,
  filters: Filter,
  orderBy: { [key: string]: string }
): Promise<InvoiceResponse> {

  try {
    const res = await graphqlFetch<InvoicesOperation>({
      query: '',
      variables: {
        dateFrom,
        dateTo,
        filters,
        orderBy
      }
    });

    console.log("Here are the vars that would be a part of a Query: ", { dateFrom,
      dateTo,
      filters,
      orderBy })

    // fake it till you make it
    if (filters.has?.text) {
      const searchText = filters.has?.text.toLowerCase();
      const sanitize = (str: string | number) => str.toString().toLowerCase().trim()
      return {
        ...res.body.data,
        records: res.body.data.records!.filter((record) => {
          return (
            sanitize(record.issueDate).includes(searchText) ||
            sanitize(record.dueDate).includes(searchText) ||
            sanitize(record.transactionNo).includes(searchText) ||
            sanitize(record.customer).includes(searchText) ||
            sanitize(record.company).includes(searchText) ||
            sanitize(record.total).includes(searchText) ||
            sanitize(record.currency).includes(searchText) ||
            sanitize(record.exchangeRate).includes(searchText)
          )
        })
      }
    }

    return res.body.data;
  } catch (error: any) {
    return error;
  }
}
