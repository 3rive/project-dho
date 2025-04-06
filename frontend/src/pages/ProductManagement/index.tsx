import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import DataTable from "react-data-table-component";

const ProductManagement = () => {
  interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    if (!name || !price || !quantity) { // Remove image validation
      alert("Please provide all product details.");
      return;
    }
  
    const productData = {
      name,
      price,
      quantity,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/products",
        productData
      );
      setProducts([...products, response.data]);
      setName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
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

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2rem" }}>
          Product Management
        </h1>

        {/* Add Product Form */}
        <div className="card shadow-sm mb-5">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0" style={{ fontWeight: "600" }}>Add New Product</h3>
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addProduct();
              }}
            >
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productQuantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productQuantity"
                  placeholder="Enter product quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-100">
                Add Product
              </button>
            </form>
          </div>
        </div>

        {/* Product DataTable */}
        <div className="card shadow-sm">
          <div className="card-header bg-secondary text-white">
            <h3 className="mb-0" style={{ fontWeight: "600" }}>Existing Products</h3>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataTable
                columns={columns}
                data={products}
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

export default ProductManagement;