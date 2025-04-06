import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable, { TableStyles } from "react-data-table-component";

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
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    // Filter sales based on the search input
    const filtered = sales.filter((sale) =>
      sale.seller.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSales(filtered);
  }, [search, sales]);

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sales/view");
      setSales(response.data || []);
      setFilteredSales(response.data || []);
    } catch (error) {
      console.error("Error fetching sales:", error);
      setSales([]);
      setFilteredSales([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Store Name",
      selector: (row: Sale) => row.seller.name,
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

  // Custom styles for the DataTable
  const customStyles: TableStyles = {
    header: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#ffffff",
        backgroundColor: "#007bff",
        textAlign: "center",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#007bff",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    headCells: {
      style: {
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#333333",
        backgroundColor: "#f8f9fa",
        "&:hover": {
          backgroundColor: "#e9ecef",
        },
      },
    },
    cells: {
      style: {
        padding: "10px",
        textAlign: "center",
      },
    },
    pagination: {
      style: {
        fontSize: "14px",
        color: "#007bff",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #dee2e6",
      },
    },
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary py-3">View Sales</h1>

        <div className="row px-3">
          <div className="col-sm-12">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0" style={{ fontWeight: "600" }}>All Sales</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by store name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <DataTable
                    columns={columns}
                    data={filteredSales}
                    pagination
                    highlightOnHover
                    striped
                    customStyles={customStyles} // Apply custom styles
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewSales;