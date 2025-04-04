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

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/sales?page=${activePage}&size=10&sort=${sortField},${sortDirection}`
      )
      .then((response) => {
        setPage(response.data);
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

  const exportToCSV = () => {
    if (!page.content) return;

    const csvData = page.content.map((sale) => ({
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
            {page.content?.map((x) => (
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