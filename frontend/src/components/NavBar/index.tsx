import React, { useState, useEffect } from "react";
import ImgDsDark from "assets/img/store_logo.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faStore, faBoxes, faFileAlt, faShoppingCart, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// Reusable NavItem Component
const NavItem = ({ to, icon, label }: { to: string; icon: any; label: string }) => {
  return (
    <li className="nav-item mx-2">
      <Link className="btn btn-light text-primary" to={to}>
        <FontAwesomeIcon icon={icon} /> {label}
      </Link>
    </li>
  );
};

// Reusable DropdownNavItem Component
const DropdownNavItem = ({
  mainLink,
  dropdownItems,
  icon,
}: {
  mainLink: { to: string; label: string };
  dropdownItems: { to: string; label: string }[];
  icon: any;
}) => {
  return (
    <li className="nav-item mx-2 dropdown">
      <div className="btn-group">
        <Link className="btn btn-light text-primary" to={mainLink.to}>
          <FontAwesomeIcon icon={icon} /> {mainLink.label}
        </Link>
        <button
          type="button"
          className="btn btn-light text-primary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu bg-light text-primary">
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <Link className="dropdown-item text-primary" to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

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
            {/* Dashboard */}
            <DropdownNavItem
              mainLink={{ to: "/dashboard", label: "Dashboard" }}
              dropdownItems={[
                { to: "/dashboard", label: "Sales Dashboard" },
                { to: "/dashboard", label: "Inventory Dashboard" },
              ]}
              icon={faChartBar}
            />

            {/* Stores */}
            <DropdownNavItem
              mainLink={{ to: "/sellers/view", label: "Stores" }}
              dropdownItems={[{ to: "/sellers/add", label: "Add Store" }]}
              icon={faStore}
            />

            {/* Inventory */}
            <DropdownNavItem
              mainLink={{ to: "/products/view", label: "Inventory" }}
              dropdownItems={[{ to: "/products", label: "Add Products" }]}
              icon={faBoxes}
            />

            {/* Sales */}
            <DropdownNavItem
              mainLink={{ to: "/sales/view", label: "Sales" }}
              dropdownItems={[
                { to: "/sales/add", label: "Add Sale" },
                { to: "/sales/recent", label: "Recent Sales" }, // Added Recent Sales link
              ]}
              icon={faShoppingCart}
            />

            {/* Reports */}
            <NavItem to="/reports/view" icon={faFileAlt} label="Reports" />
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