import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import React-Select
import NavBar from "components/NavBar";
import Footer from "components/Footer";

const AddSales = () => {
  interface Product {
    id: number;
    name: string;
    quantity: number;
  }

  interface Seller {
    id: number;
    name: string;
  }

  const [sellers, setSellers] = useState<Seller[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ id: number; quantity: number }[]>([]);
  const [sellerId, setSellerId] = useState<number | "">("");
  const [visited, setVisited] = useState<number | "">("");
  const [deals, setDeals] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    fetchSellers();
    fetchProducts();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sellers");
      setSellers(response.data || []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductChange = (selectedOptions: any) => {
    const updatedProducts = selectedOptions.map((option: any) => ({
      id: option.value,
      quantity: 1, // Default quantity
    }));
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const addSale = async () => {
    if (!sellerId || !visited || !deals || !amount || !date || selectedProducts.length === 0) {
      alert("Please fill in all fields and select at least one product.");
      return;
    }

    const saleData = {
      seller: { id: sellerId },
      visited,
      deals,
      amount,
      date,
      products: selectedProducts,
    };

    console.log("Payload:", saleData); // Debugging: Log the payload

    try {
      await axios.post("http://localhost:8080/sales/add", saleData);
      alert("Sale added successfully!");
      setSellerId("");
      setVisited("");
      setDeals("");
      setAmount("");
      setDate("");
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error adding sale:", error);
      alert("Failed to add sale. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2rem" }}>
          Add Sale
        </h1>

        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0" style={{ fontWeight: "600" }}>New Sale</h3>
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addSale();
              }}
            >
              <div className="mb-3">
                <label htmlFor="seller" className="form-label">
                  Seller
                </label>
                <select
                  className="form-control"
                  id="seller"
                  value={sellerId}
                  onChange={(e) => setSellerId(Number(e.target.value))}
                >
                  <option value="">Select a seller</option>
                  {sellers.map((seller) => (
                    <option key={seller.id} value={seller.id}>
                      {seller.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="products" className="form-label">
                  Products
                </label>
                <Select
                  isMulti
                  options={products.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))}
                  onChange={handleProductChange}
                  placeholder="Search and select products"
                />
              </div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="d-flex align-items-center mb-2">
                  <span className="me-2">
                    {products.find((p) => p.id === product.id)?.name}
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                  />
                </div>
              ))}
              <div className="mb-3">
                <label htmlFor="visited" className="form-label">
                  Customers Visited
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="visited"
                  placeholder="Enter number of customers visited"
                  value={visited}
                  onChange={(e) => setVisited(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deals" className="form-label">
                  Deals Closed
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="deals"
                  placeholder="Enter number of deals closed"
                  value={deals}
                  onChange={(e) => setDeals(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Sale Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="Enter sale amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Add Sale
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddSales;