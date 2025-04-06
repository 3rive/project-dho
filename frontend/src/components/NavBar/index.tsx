import React, { useState, useEffect } from "react";
import ImgDsDark from "assets/img/MSL.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faStore, faBoxes, faFileAlt, faShoppingCart, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    alert("You have been logged out!");
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-primary border-bottom shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <Link to="/">
          <img src={ImgDsDark} alt="App Logo" width="120" />
        </Link>

        {/* Navigation Links */}
        <nav className="d-flex">
          <ul className="nav nav-pills d-flex flex-row">
            {/* Dashboard Dropdown */}
            <li className="nav-item mx-2 dropdown">
              <div className="btn-group">
                <Link className="btn btn-light text-primary" to="/dashboard">
                  <FontAwesomeIcon icon={faChartBar} /> Dashboard
                </Link>
                <button
                  type="button"
                  className="btn btn-light text-primary dropdown-toggle dropdown-toggle-split"
                  id="dashboardDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu bg-light text-primary" aria-labelledby="dashboardDropdown">
                  <li>
                    <Link className="dropdown-item text-primary" to="/dashboard">
                      Sales Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-primary" to="/dashboard">
                      Inventory Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Stores Dropdown */}
            <li className="nav-item mx-2 dropdown">
              <div className="btn-group">
                <Link className="btn btn-light text-primary" to="/sellers/view">
                  <FontAwesomeIcon icon={faStore} /> Stores
                </Link>
                <button
                  type="button"
                  className="btn btn-light text-primary dropdown-toggle dropdown-toggle-split"
                  id="storesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu bg-light text-primary" aria-labelledby="storesDropdown">
                  <li>
                    <Link className="dropdown-item text-primary" to="/sellers/add">
                      Add Store
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-primary" to="/sellers/view">
                      View Stores
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Inventory Dropdown */}
            <li className="nav-item mx-2 dropdown">
              <div className="btn-group">
                <Link className="btn btn-light text-primary" to="/inventory/dashboard">
                  <FontAwesomeIcon icon={faBoxes} /> Inventory
                </Link>
                <button
                  type="button"
                  className="btn btn-light text-primary dropdown-toggle dropdown-toggle-split"
                  id="inventoryDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu bg-light text-primary" aria-labelledby="inventoryDropdown">
                  <li>
                    <Link className="dropdown-item text-primary" to="/products">
                      Add Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-primary" to="/products">
                      View Products
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Reports Dropdown */}
            <li className="nav-item mx-2 dropdown">
              <div className="btn-group">
                <Link className="btn btn-light text-primary" to="/reports/dashboard">
                  <FontAwesomeIcon icon={faFileAlt} /> Reports
                </Link>
                <button
                  type="button"
                  className="btn btn-light text-primary dropdown-toggle dropdown-toggle-split"
                  id="reportsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu bg-light text-primary" aria-labelledby="reportsDropdown">
                  <li>
                    <Link className="dropdown-item text-primary" to="/reports/tax">
                      Tax Reports
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-primary" to="/reports/sales">
                      Sales Reports
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-primary" to="/reports/inventory">
                      Inventory Reports
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* View Sales Link */}
            <li className="nav-item mx-2">
              <Link className="btn btn-light text-primary" to="/sales/view">
                <FontAwesomeIcon icon={faShoppingCart} /> View Sales
              </Link>
            </li>
          </ul>
        </nav>

        {/* Timer and Logout Section */}
        <div className="d-flex align-items-center">
          <div className="text-white me-3" style={{ fontSize: "0.9rem", textAlign: "right" }}>
            <strong>{currentTime}</strong>
          </div>
          <button
            className="btn btn-light text-primary"
            onClick={handleLogout}
            style={{ fontSize: "1rem" }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;