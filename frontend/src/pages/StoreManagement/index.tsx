import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="container">
      <h1 className="text-primary py-3">Store Management</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Store Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={addStore} className="btn btn-primary">Add Store</button>
      </div>
      <ul className="list-group">
        {stores.map((store: any) => (
          <li key={store.id} className="list-group-item d-flex justify-content-between align-items-center">
            {store.name} - {store.location}
            <button onClick={() => deleteStore(store.id)} className="btn btn-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreManagement;