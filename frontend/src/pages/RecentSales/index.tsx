import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable from "react-data-table-component";

interface Sale {
  id: number;
  date: string;
  amount: number;
  name: string;
}

const RecentSales = () => {
  const [recentSales, setRecentSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetchRecentSales();
  }, []);

  const fetchRecentSales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sales/recent");
      setRecentSales(response.data || []);
    } catch (error) {
      console.error("Error fetching recent sales:", error);
    }
  };

  const columns = [
    {
      name: "Date",
      selector: (row: Sale) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Seller",
      selector: (row: Sale) => row.name,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: Sale) => `$${row.amount.toFixed(2)}`,
      sortable: true,
    },
  ];

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-primary py-3">Recent Sales</h1>
        <DataTable
          columns={columns}
          data={recentSales}
          pagination
          highlightOnHover
          striped
        />
      </div>
      <Footer />
    </>
  );
};

export default RecentSales;