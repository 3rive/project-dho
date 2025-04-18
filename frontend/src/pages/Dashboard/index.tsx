import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "components/BarChart";
import DonutChart from "components/DonutChart";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import TotalSales from "components/TotalSales";

interface Seller {
  id: number;
  name: string;
  totalSales: number;
}

const Dashboard = () => {
  const [topSellers, setTopSellers] = useState<Seller[]>([]);

  useEffect(() => {
    fetchTopSellers();
  }, []);

  const fetchTopSellers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sellers/top");
      const uniqueSellers = removeDuplicates(response.data || []);
      const sortedSellers = uniqueSellers.sort((a, b) => b.totalSales - a.totalSales); // Sort by totalSales in descending order
      setTopSellers(sortedSellers);
    } catch (error) {
      console.error("Error fetching top sellers:", error);
    }
  };

  const removeDuplicates = (sellers: Seller[]): Seller[] => {
    const uniqueSellersMap = new Map<number, Seller>();
    sellers.forEach((seller) => {
      if (!uniqueSellersMap.has(seller.id)) {
        uniqueSellersMap.set(seller.id, seller);
      }
    });
    return Array.from(uniqueSellersMap.values());
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary py-3">Sales Dashboard</h1>
        <TotalSales />
        <div className="row px-3">
          <div className="col-sm-6">
            <h5 className="text-center text-secondary">Success rate (%)</h5>
            <BarChart />
          </div>
          <div className="col-sm-6">
            <h5 className="text-center text-secondary">All sales</h5>
            <DonutChart />
          </div>
        </div>

        <div className="row px-3 mt-4">
          <div className="col-sm-12">
            <h3 className="text-primary">Top Performing Stores</h3>
            <ul className="list-group">
              {topSellers.map((seller, index) => (
                <li
                  key={seller.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {index + 1}. {seller.name}
                  </span>
                  <span className="badge bg-success">
                    ${seller.totalSales?.toFixed(2) || 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;