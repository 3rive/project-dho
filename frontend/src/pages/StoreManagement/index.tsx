import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "components/Footer";
import NavBar from "components/NavBar";

const StoreManagement = () => {
  interface Store {
    id: number;
    name: string;
    location: string;
  }

  const [stores, setStores] = useState<Store[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const response = await axios.get('http://localhost:8080/api/stores');
    setStores(response.data);
  };

  const addStore = async () => {
    if (!name || !location) {
      alert('Please provide both name and location');
      return;
    }
    const response = await axios.post('http://localhost:8080/api/stores', { name, location });
    setStores([...stores, response.data]);
    setName('');
    setLocation('');
  };

  const deleteStore = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/stores/${id}`);
    setStores(stores.filter((store: any) => store.id !== id));
  };

    return (
      <>
      <NavBar />
      <div className="container">
        <h1>Store Management</h1>
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              {store.name} - {store.location}
              <button onClick={() => deleteStore(store.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Store Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Store Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={addStore}>Add Store</button>
        </div>
      </div>
      <Footer />
      </>
    );
};

export default StoreManagement;