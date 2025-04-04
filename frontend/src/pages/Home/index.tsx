import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";
import 'assets/css/styles.css'; // Add a custom CSS file for additional styling

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid p-0">
        {/* Hero Section */}
        <div className="hero-section text-center py-5">
          <div className="hero-overlay">
            <h1 className="display-3 text-white">Welcome to DSSales</h1>
            <p className="lead text-light mt-3">
              Empower your business with actionable insights. Analyze your sales performance from multiple perspectives.
            </p>
            <div className="mt-4">
              <Link className="btn btn-primary btn-lg mx-2" to="/dashboard">
                Access Dashboard
              </Link>
              <Link className="btn btn-outline-light btn-lg mx-2" to="/reports">
                View Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section text-center py-5">
          <h2 className="text-primary mb-4">Why Choose DSSales?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm">
                <h5 className="text-secondary">Real-Time Analytics</h5>
                <p>Get up-to-date insights into your sales performance with real-time data visualization.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm">
                <h5 className="text-secondary">Customizable Reports</h5>
                <p>Create and view reports tailored to your business needs for better decision-making.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm">
                <h5 className="text-secondary">User-Friendly Interface</h5>
                <p>Navigate through the application with ease using our intuitive and responsive design.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;