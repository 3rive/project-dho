import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable from "react-data-table-component";

interface Seller {
  id: number;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;
}

const ViewSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sellers");
      setSellers(response.data || []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row: Seller) => row.name,
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
  ];

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary py-3">Sellers Dashboard</h1>

        <div className="row px-3">
          <div className="col-sm-12">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0" style={{ fontWeight: "600" }}>All Sellers</h3>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <DataTable
                    columns={columns}
                    data={sellers}
                    pagination
                    highlightOnHover
                    striped
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