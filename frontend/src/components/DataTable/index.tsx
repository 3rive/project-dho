import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sales";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

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

  return (
    <>
      <Pagination page={page} onPageChange={changePage} />
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