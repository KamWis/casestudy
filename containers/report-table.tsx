"use client";

import { startOfMonth, endOfMonth } from "date-fns";
import { ChangeEvent, useCallback, useState, useMemo } from "react";
import debounce from "lodash.debounce";

import { getInvoices } from "@/lib/api";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import Filters from "@/components/table/filters";
import Actions from "@/components/table/actions";
import Table, { TableProps } from "@/components/table";
import Button from "@/components/button";

interface ReportTableProps extends Omit<TableProps, "onSelectRows"> {
  total: number;
}

/**
 * TODO: Allow for custom cells - use lib like react-data-grid or react-table-library
 */

export default function ReportTable({
  total,
  columns,
  rows,
  checkboxSelection,
}: ReportTableProps) {
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
      <div className="w-full mt-3 md:mt-0 md:w-1/3 justify-end flex py-4">
        <Actions
          onClick={() => {
            console.log("Delete selected has been clicked");
          }}
        />
      </div>
      <div className="w-full flex flex-wrap">
        <div className="w-full">
          <Table
            // setSortBy={callback}
            // removeEntry={callback}
            // setOffset={callback}
            columns={columns}
            rows={tableRows}
            checkboxSelection={checkboxSelection}
            onSelectRows={(selectedRows) =>
              console.log("Selected Rows: ", selectedRows)
            }
          />
        </div>
        <div className="w-full flex justify-center mt-5 mb-10 relative">
          <Button className="text-lg text-gray-600">
            Show more <ChevronDownIcon className="ml-2" />
          </Button>
          <div className="text-gray-500 text-sm absolute right-0 top-1">
            Showing {rows.length} of {total} records
          </div>
        </div>
      </div>
    </div>
  );
}
