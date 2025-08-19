import { useState } from "react";
import type { DataTableProps } from "./DataTable.types";

function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  // Sorting handler
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Apply sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey as keyof T];
    const bValue = b[sortKey as keyof T];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Row selection
  const handleRowClick = (row: T) => {
    if (!selectable) return;

    let updatedSelection: T[] = [];
    if (selectedRows.includes(row)) {
      updatedSelection = selectedRows.filter((r) => r !== row);
    } else {
      updatedSelection = [...selectedRows, row];
    }

    setSelectedRows(updatedSelection);
    onRowSelect?.(updatedSelection);
  };

  // Render states
  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading...</div>
    );
  }

  if (!data.length) {
    return (
      <div className="p-4 text-center text-gray-500">No data available</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.title}
                {col.sortable && sortKey === col.key && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className={`hover:bg-gray-100 ${
                selectable && selectedRows.includes(row)
                  ? "bg-blue-50"
                  : ""
              }`}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
