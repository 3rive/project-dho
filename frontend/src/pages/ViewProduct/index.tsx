import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable, { TableStyles } from "react-data-table-component";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ViewProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search input
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data || []);
      setFilteredProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row: Product) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Product) => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row: Product) => row.quantity,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Product) => (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => deleteProduct(row.id)}
        >
          Delete
        </button>
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
        <h1 className="text-primary py-3">View Products</h1>

        <div className="row px-3">
          <div className="col-sm-12">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0" style={{ fontWeight: "600" }}>All Products</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by product name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <DataTable
                    columns={columns}
                    data={filteredProducts}
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

export default ViewProduct;