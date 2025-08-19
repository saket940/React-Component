import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "./DataTable";
import { describe, it, expect, vi } from "vitest";

type User = { id: number; name: string; email: string };

const mockColumns = [
  { key: "name", title: "Name", dataIndex: "name" as keyof User, sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as keyof User },
];

const mockData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

describe("DataTable Component", () => {
  it("renders table headers", () => {
    render(<DataTable<User> data={mockData} columns={mockColumns} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders rows of data", () => {
    render(<DataTable<User> data={mockData} columns={mockColumns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<DataTable<User> data={[]} columns={mockColumns} loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("calls onRowSelect when a row is clicked (if selectable)", () => {
    const handleSelect = vi.fn();
    render(
      <DataTable<User>
        data={mockData}
        columns={mockColumns}
        selectable
        onRowSelect={handleSelect}
      />
    );

    const row = screen.getByText("Alice");
    fireEvent.click(row);
    expect(handleSelect).toHaveBeenCalled();
  });
});
