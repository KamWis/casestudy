/* TODO: We should have Transaction here as well and it should be a part of the Invoice:
  transaction: {
    transactionNo: string;
    status: 'paid' | 'sent' | 'outdated' etc.
  }
*/
export type Invoice = {
  id: string;
  issueDate: number;
  dueDate: number;
  transactionNo: string;
  customer: string;
  company: string;
  total: number;
  currency: string;
  exchangeRate: number;
};


export interface TableReponse<T> {
  total?: number;
  offset?: number;
  limit?: number;
  error?: Error;
  records?: T;
}

export type Filter = Record<string, any>;

export type Breadcrumb = { path: string; value: string };

export interface InvoiceResponse extends TableReponse<Invoice[]> {};

export type InvoicesOperation = {
  data: InvoiceResponse;
  variables: {
    dateFrom: number;
    dateTo: number;
    filters: Filter;
    orderBy: { [key: string]: string; };
  };
};
