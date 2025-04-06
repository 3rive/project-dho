import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sales";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const DataTable = () => {
  const [page, setPage] = useState<SalePage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const [activePage, setActivePage] = useState(0);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filter, setFilter] = useState(""); // State for filter input
  const [filteredData, setFilteredData] = useState<SalePage | null>(null); // State for filtered data

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/sales?page=${activePage}&size=10&sort=${sortField},${sortDirection}`
      )
      .then((response) => {
        setPage(response.data);
        setFilteredData(response.data); // Initialize filtered data
      });
  }, [activePage, sortField, sortDirection]);

  const changePage = (index: number) => {
    setActivePage(index);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);

    if (value === "") {
      setFilteredData(page); // Reset to original data if filter is empty
    } else {
      const filteredContent = page.content?.filter((sale) =>
        sale.seller.name.toLowerCase().includes(value)
      );
      setFilteredData({ ...page, content: filteredContent });
    }
  };

  const exportToCSV = () => {
    if (!filteredData?.content) return;

    const csvData = filteredData.content.map((sale) => ({
      Date: formatLocalDate(sale.date, "dd/MM/yyyy"),
      Seller: sale.seller.name,
      "Customers Visited": sale.visited,
      "Closed Deals": sale.deals,
      Amount: sale.amount.toFixed(2),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales_data.csv");
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <Pagination page={page} onPageChange={changePage} />
        <button className="btn btn-primary" onClick={exportToCSV}>
          Export to CSV
        </button>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by seller name"
          value={filter}
          onChange={handleFilter}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th onClick={() => handleSort("date")}>
                Date {sortField === "date" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("seller.name")}>
                Seller {sortField === "seller.name" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("visited")}>
                Customers visited {sortField === "visited" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("deals")}>
                Closed deals {sortField === "deals" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("amount")}>
                Amount {sortField === "amount" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.content?.map((x) => (
              <tr key={x.id}>
                <td>{formatLocalDate(x.date, "dd/MM/yyyy")}</td>
                <td>{x.seller.name}</td>
                <td>{x.visited}</td>
                <td>{x.deals}</td>
                <td>{x.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;