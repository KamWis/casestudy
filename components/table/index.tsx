"use client";

import clsx from "clsx";
import { Table as RadixTable, Checkbox } from "@radix-ui/themes";
import { useCallback, useState } from "react";

export type TableProps = {
  columns: { name: string; sortable: boolean }[];
  rows: Record<string, string | number>[];
  checkboxSelection?: boolean;
  onSelectRows: (rows: Record<string, string | number>[]) => void;
};

/**
 * I don't like this table - Radix Themes for table is very basic. I'd use react-data-grid or react-table-library
 */

const SelectAllCell = ({
  onSelectAll,
}: {
  onSelectAll: (value: boolean) => void;
}) => {
  return (
    <RadixTable.ColumnHeaderCell className="!font-medium !py-2 !h-4">
      <Checkbox onCheckedChange={onSelectAll} />
    </RadixTable.ColumnHeaderCell>
  );
};

const SelectCell = ({
  onSelectSingle,
  isSelected,
}: {
  onSelectSingle: (value: boolean) => void;
  isSelected: boolean;
}) => {
  return (
    <RadixTable.Cell className="!font-medium !py-2 !h-4 text-base !text-gray-600">
      <Checkbox onCheckedChange={onSelectSingle} checked={isSelected} />
    </RadixTable.Cell>
  );
};

export default function Table({
  columns,
  rows,
  checkboxSelection = false,
  onSelectRows,
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState<
    Record<string, string | number>[]
  >([]);

  const onSelectAll = useCallback(
    (checkboxSelected: boolean) => {
      if (checkboxSelected) {
        onSelectRows(rows);
        setSelectedRows(rows);
        return;
      }

      onSelectRows([]);
      setSelectedRows([]);
    },
    [onSelectRows, rows]
  );

  const onSelectSingle = useCallback(
    (row: Record<string, string | number>) => (checkboxSelected: boolean) => {
      if (checkboxSelected) {
        const withAddedRow = [...selectedRows, row];

        setSelectedRows(withAddedRow);
        onSelectRows(withAddedRow);

        return;
      }

      const withRemovedRow = [
        ...selectedRows.filter((selectedRow) => selectedRow.id !== row.id),
      ];

      setSelectedRows(withRemovedRow);
      onSelectRows(withRemovedRow);
    },
    [onSelectRows, selectedRows]
  );

  return (
    <RadixTable.Root className="border-t border-gray-300">
      <RadixTable.Header>
        <RadixTable.Row className="!text-gray-600">
          {checkboxSelection && <SelectAllCell onSelectAll={onSelectAll} />}
          {columns.map((column) => {
            return (
              <RadixTable.ColumnHeaderCell
                key={column.name}
                className="!font-medium !py-2 !h-4"
              >
                {column.name}
              </RadixTable.ColumnHeaderCell>
            );
          })}
        </RadixTable.Row>
      </RadixTable.Header>

      <RadixTable.Body className="bg-white">
        {rows.map((row) => {
          const isSelected = selectedRows.some(
            (selectedRow) => selectedRow.id === row.id
          );
          return (
            <RadixTable.Row
              key={row.id}
              className={clsx(
                "hover:!bg-gray-100",
                isSelected && "!bg-pistachio"
              )}
            >
              {checkboxSelection && (
                <SelectCell
                  onSelectSingle={onSelectSingle(row)}
                  isSelected={isSelected}
                />
              )}
              {Object.keys(row)
                .filter((cell) => cell !== "id")
                .map((cell) => {
                  return (
                    <RadixTable.Cell
                      key={row.id + cell}
                      className="!font-medium !py-2 !h-4 text-base !text-gray-600"
                    >
                      {row[cell]}
                    </RadixTable.Cell>
                  );
                })}
            </RadixTable.Row>
          );
        })}
      </RadixTable.Body>
    </RadixTable.Root>
  );
}
