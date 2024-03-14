import { startOfMonth, endOfMonth } from "date-fns";

import Header from "@/components/report-header";
import ReportTable from "@/container/report-table";
import { getInvoices } from "@/lib/api";

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
          <ReportTable rows={data.records} />
        </div>
      </div>
    </div>
  );
}
