import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";
import type { DataTableProps } from "./DataTable.types";

type User = { id: number; name: string; email: string };

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  } as DataTableProps<User>,
};

export const Sortable: Story = {
  args: {
    data: sampleData,
    columns,
  } as DataTableProps<User>,
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    onRowSelect: (rows: User[]) => alert(`Selected: ${rows.map(r => r.name).join(", ")}`),
  } as DataTableProps<User>,
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  } as DataTableProps<User>,
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  } as DataTableProps<User>,
};
