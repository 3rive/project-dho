import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    setProducts(response.data);
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (image) {
      formData.append("image", image);
    }

    await axios.post("http://localhost:8080/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    fetchProducts();
  };

  return (
        <>
          <NavBar />
    <div>
      <h2>Product Management</h2>
      <form onSubmit={addProduct}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <img src={`/${product.imageUrl}`} alt={product.name} width="50" />
            {product.name} - ${product.price} - {product.quantity} units
          </li>
        ))}
      </ul>
    </div>
          <Footer />
          </>
  );
};

export default ProductManagement;