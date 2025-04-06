import React, { useState, useEffect } from "react";
import axios from "axios";

const TotalSales = () => {
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get("http://localhost:8080/sales/total");
        setTotalSales(response.data.totalSales);
      } catch (error) {
        console.error("Error fetching total sales:", error);
        setTotalSales(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSales();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        {loading ? (
          <p>Loading total sales...</p>
        ) : totalSales !== null ? (
          <h3 className="text-primary" style={{ fontWeight: "bold" }}>
            Total Sales: ${totalSales.toFixed(2)}
          </h3>
        ) : (
          <p className="text-danger">Failed to load total sales</p>
        )}
      </div>
    </div>
  );
};

export default TotalSales;