import React from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const ViewReport = () => {
  const downloadReport = async (reportType: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/reports/${reportType}/pdf`,
        {
          responseType: "blob", // Important for downloading files
        }
      );

      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Set the filename based on the report type
      link.setAttribute("download", `${reportType}_report.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download the report. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2rem" }}>
          Download Reports
        </h1>

        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0" style={{ fontWeight: "600" }}>Available Reports</h3>
          </div>
          <div className="card-body">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="reportDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faDownload} /> Download Reports
              </button>
              <ul className="dropdown-menu" aria-labelledby="reportDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => downloadReport("sales")}
                  >
                    Sales Report
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => downloadReport("inventory")}
                  >
                    Inventory Report
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => downloadReport("stores")}
                  >
                    Store Report
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewReport;