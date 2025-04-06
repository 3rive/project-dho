import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable from "react-data-table-component";

interface Sale {
  id: number;
  visited: number;
  deals: number;
  amount: number;
  date: string;
  seller: {
    id: number;
    name: string;
  };
}

const ViewSales = () => {
  const [sales, setSales] = useState<Sale[]>([]); // Ensure sales is initialized as an array
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sales");
      if (response.headers["content-type"]?.includes("application/json")) {
        setSales(response.data || []);
      } else {
        console.error("Invalid JSON response");
        setSales([]);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Store Name",
      selector: (row: Sale) => row.seller.name, // Correctly access seller.name
      sortable: true,
    },
    {
      name: "Visited",
      selector: (row: Sale) => row.visited,
      sortable: true,
    },
    {
      name: "Deals",
      selector: (row: Sale) => row.deals,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: Sale) => `$${row.amount.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: Sale) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2rem" }}>
          View Sales
        </h1>
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0" style={{ fontWeight: "600" }}>All Sales</h3>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p> // Show a loading message while data is being fetched
            ) : (
              <DataTable
                columns={columns}
                data={sales} // Ensure data is always an array
                pagination
                highlightOnHover
                striped
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewSales;