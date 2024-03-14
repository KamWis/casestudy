"use client";

import { startOfMonth, endOfMonth } from "date-fns";
import { ChangeEvent, useCallback, useState, useMemo } from "react";
import debounce from "lodash.debounce";

import { getInvoices } from "@/lib/api";

import Filters from "@/components/table/filters";
/**
 * TODO: Allow for custom cells - use lib like react-data-grid or react-table-library
 */

export default function ReportTable({ rows }: any) {
  const [tableRows, setTableRows] = useState(rows);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        //for now we're setting defaults - otherwise, we'd use selected dates from range
        //same for sorting
        //I'd love to use ApolloClient while working at scale.
        const dateFrom = startOfMonth(new Date()).getTime();
        const dateTo = endOfMonth(new Date()).getTime();
        const data = await getInvoices(
          dateFrom,
          dateTo,
          {
            has: { text: value },
          },
          { issueDate: "ASC" }
        );

        setTableRows(data.records);

        console.log(tableRows);
      }, 300),
    []
  );

  const onSearch = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await debouncedSearch(event.currentTarget.value);
    },
    [debouncedSearch]
  );

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-2/3 flex items-center flex-wrap py-4">
        <Filters onSearch={onSearch} />
      </div>
    </div>
  );
}
