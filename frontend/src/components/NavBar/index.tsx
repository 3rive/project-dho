import ImgDsDark from 'assets/img/logoApp.svg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <Link to="/">
          <img src={ImgDsDark} alt="App Logo" width="120" />
        </Link>

        {/* Navigation Links */}
        <nav className="d-flex">
          <ul className="nav nav-pills d-flex flex-row">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/transactions">
                Transactions
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/invoices">
                Invoices
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/expenses">
                Expenses
              </Link>
            </li>
            <li className="nav-item mx-2 dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="reportsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Reports
              </Link>
              <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                <li>
                  <Link className="dropdown-item" to="/reports/summary">
                    Summary
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/reports/profit-loss">
                    Profit & Loss
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/reports/balance-sheet">
                    Balance Sheet
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/clients">
                Clients
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/vendors">
                Vendors
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/accounts">
                Accounts
              </Link>
            </li>
            <li className="nav-item mx-2 dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="settingsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </Link>
              <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
                <li>
                  <Link className="dropdown-item" to="/settings/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/settings/preferences">
                    Preferences
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/settings/integrations">
                    Integrations
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/help">
                Help
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;