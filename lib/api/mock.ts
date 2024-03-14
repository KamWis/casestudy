import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { InvoiceResponse, Invoice } from '../types';

const generateItems = (amount: number): Invoice[] => [...(new Array(amount))].map((index) => ({
  id: uuid(),
  issueDate: new Date(faker.date.between({ from: 1701385200000, to: 1703718000000 })).getTime(),
  dueDate: 1703718000000,
  transactionNo: `I-${faker.number.int({ min: 130000, max: 140000 })}`,
  customer: faker.company.name(),
  company: 'Best Company, Inc.',
  total: faker.number.int({ min: 13000, max: 40000 }),
  currency: 'USD',
  exchangeRate: 0.912873,
}));

export const INVOICE_TABLE_DATA_MOCK: InvoiceResponse = {
  total: 1254,
  offset: 0,
  limit: 62,
  records: generateItems(62)
};