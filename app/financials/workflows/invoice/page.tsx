import { startOfMonth, endOfMonth } from "date-fns";

import Header from "@/components/report-header";
import ReportTable from "@/containers/report-table";
import { getInvoices } from "@/lib/api";

const COLUMNS_CONFIG = [
  {
    name: "Issue Date",
    sortable: true,
  },
  {
    name: "Due Date",
    sortable: true,
  },
  {
    name: "Transaction No.",
    sortable: true,
  },
  {
    name: "Customer",
    sortable: true,
  },
  {
    name: "Company",
    sortable: true,
  },
  {
    name: "Total",
    sortable: true,
  },
  {
    name: "Currency",
    sortable: true,
  },
  {
    name: "Exchange Rate",
    sortable: true,
  },
];

export default async function Invoice() {
  const dateFrom = startOfMonth(new Date()).getTime();
  const dateTo = endOfMonth(new Date()).getTime();

  const data = await getInvoices(dateFrom, dateTo, {}, { issueDate: "ASC" });

  return (
    <div className="w-full">
      <div className="bg-pistachio w-full self-start">
        <div className="container m-auto">
          <Header text="Invoice" />
        </div>
      </div>
      <div className="container m-auto">
        <div className="px-4 md:px-0">
          <ReportTable
            checkboxSelection={true}
            total={data.total}
            columns={COLUMNS_CONFIG}
            rows={data.records}
          />
        </div>
      </div>
    </div>
  );
}
