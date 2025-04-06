import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable, { TableStyles } from "react-data-table-component";

interface Seller {
  id: number;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;
}

const ViewSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [filteredSellers, setFilteredSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSellers();
  }, []);

  useEffect(() => {
    // Filter sellers based on the search input
    const filtered = sellers.filter((seller) =>
      seller.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSellers(filtered);
  }, [search, sellers]);

  const fetchSellers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sellers");
      setSellers(response.data || []);
      setFilteredSellers(response.data || []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
      setSellers([]);
      setFilteredSellers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteSeller = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/sellers/${id}`);
      setSellers(sellers.filter((seller) => seller.id !== id));
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  const editSeller = (id: number) => {
    // Redirect to an edit page or open a modal for editing
    alert(`Edit functionality for seller with ID: ${id}`);
  };

  const columns = [
    {
      name: "Store Name",
      cell: (row: Seller) => (
        <Link to={`/stores/${row.id}`} className="text-primary">
          {row.name}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Location",
      selector: (row: Seller) => row.location,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row: Seller) => row.address,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row: Seller) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Seller) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => editSeller(row.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => deleteSeller(row.id)}
          >
            Delete
          </button>
        </div>
      ),
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
        <h1 className="text-primary py-3">View Stores</h1>

        <div className="row px-3">
          <div className="col-sm-12">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0" style={{ fontWeight: "600" }}>All Stores</h3>
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
                    data={filteredSellers}
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

export default ViewSellers;