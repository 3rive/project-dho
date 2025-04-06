import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import DataTable from "react-data-table-component"; // Install this library using `npm install react-data-table-component`

const ProductManagement = () => {
  interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/products');
    setProducts(response.data);
  };

  const addProduct = async () => {
    if (!name || !category || !price || !stock) {
      alert('Please provide all product details');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/products', {
        name,
        category,
        price,
        quantity: stock, // Map 'stock' to 'quantity' for backend compatibility
        imageUrl: '', // Optional: Add a default or empty image URL
      });
      setProducts([...products, response.data]); // Update the state with the new product
      setName('');
      setCategory('');
      setPrice('');
      setStock('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    setProducts(products.filter((product: any) => product.id !== id));
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: "Product Name",
      selector: (row: Product) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: Product) => row.category,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Product) => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row: Product) => row.stock,
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
        <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Product Management
        </h1>

        {/* Add Product Form */}
        <div className="card shadow-sm mb-5">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0" style={{ fontWeight: '600' }}>Add New Product</h3>
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
                <label htmlFor="productCategory" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productCategory"
                  placeholder="Enter product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                <label htmlFor="productStock" className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productStock"
                  placeholder="Enter product stock"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
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
            <h3 className="mb-0" style={{ fontWeight: '600' }}>Existing Products</h3>
          </div>
          <div className="card-body">
            <DataTable
              columns={columns}
              data={products}
              pagination
              highlightOnHover
              striped
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductManagement;