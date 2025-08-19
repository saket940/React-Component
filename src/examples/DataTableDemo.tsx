import React, { useState } from "react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable/DataTable.types";

type User = { id: number; name: string; email: string };

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as keyof User },
];

const DataTableDemo: React.FC = () => {
  const [selected, setSelected] = useState<User[]>([]);

  const handleRowSelect = (rows: User[]) => {
    setSelected(rows);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">DataTable Demo</h2>
      <DataTable<User>
        data={sampleData}
        columns={columns}
        selectable
        onRowSelect={handleRowSelect}
      />

      {selected.length > 0 && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Selected Users:</strong>{" "}
          {selected.map((u) => u.name).join(", ")}
        </div>
      )}
    </div>
  );
};

export default DataTableDemo;
