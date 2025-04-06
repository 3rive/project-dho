import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import DataTable from "react-data-table-component";

const StoreManagement = () => {
  interface Store {
    id: number;
    name: string;
    location: string;
    address: string;
    phoneNumber: string;
  }

  const [stores, setStores] = useState<Store[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const response = await axios.get('http://localhost:8080/sellers');
    setStores(response.data);
  };

  const addStore = async () => {
    if (!name || !location || !address || !phoneNumber) {
      alert('Please provide all store details');
      return;
    }
    const response = await axios.post('http://localhost:8080/sellers', {
      name,
      location,
      address,
      phoneNumber,
    });
    setStores([...stores, response.data]); // Update the state to include the new store
    setName('');
    setLocation('');
    setAddress('');
    setPhoneNumber('');
  };

  const deleteStore = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/sellers/${id}`);
    setStores(stores.filter((store: any) => store.id !== id));
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: "Store Name",
      selector: (row: Store) => row.name,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row: Store) => row.location,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row: Store) => row.address,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row: Store) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Store) => (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => deleteStore(row.id)}
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
        <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Store Management
        </h1>

        {/* Add Store Form */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0" style={{ fontWeight: '600' }}>Add New Store</h5>
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addStore();
              }}
            >
              <div className="row g-2">
                <div className="col-md-6">
                  <label htmlFor="storeName" className="form-label small">
                    Store Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="storeName"
                    placeholder="Enter store name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="storeLocation" className="form-label small">
                    Store Location
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="storeLocation"
                    placeholder="Enter store location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col-md-6">
                  <label htmlFor="storeAddress" className="form-label small">
                    Store Address
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="storeAddress"
                    placeholder="Enter store address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneNumber" className="form-label small">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-sm w-100 mt-3">
                Add Store
              </button>
            </form>
          </div>
        </div>

        {/* Store DataTable */}
        <div className="card shadow-sm">
          <div className="card-header bg-secondary text-white">
            <h5 className="mb-0" style={{ fontWeight: '600' }}>Existing Stores</h5>
          </div>
          <div className="card-body p-2">
            <DataTable
              columns={columns}
              data={stores}
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

export default StoreManagement;