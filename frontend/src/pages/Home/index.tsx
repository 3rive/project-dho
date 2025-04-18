import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";
import 'assets/css/styles.css'; // Add a custom CSS file for additional styling
import bookkeepingImage from 'assets/img/bookkeeping.jpg'; // Add a relevant image
import analyticsImage from 'assets/img/analytics.jpg'; // Add another relevant image
import reportsImage from 'assets/img/reports.jpg'; // Add another relevant image

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid p-0">
        {/* Hero Section */}
        <div
          className="hero-section text-center py-5"
          style={{
            backgroundImage: `url(${bookkeepingImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <div className="hero-overlay">
            <h1 className="display-3 text-white">Manage your Stores with ease</h1>
            <p className="lead text-light mt-3">
              Simplify your Store Management with powerful tools and insights.
            </p>
            <div className="mt-4">
              <Link className="btn btn-primary btn-lg mx-2" to="/dashboard">
                Access Dashboard
              </Link>
              <Link className="btn btn-outline-light btn-lg mx-2" to="/reports/view">
                View Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section text-center py-5">
          <h2 className="text-primary mb-4">Why Choose MSL?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm">
                <img
                  src={analyticsImage}
                  alt="Analytics"
                  className="img-fluid mb-3"
                  style={{ borderRadius: "10px" }}
                />
                <h5 className="text-secondary">Real-Time Analytics</h5>
                <p>
                  Get up-to-date insights into your bookkeeping with real-time
                  data visualization.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm">
                <img
                  src={reportsImage}
                  alt="Reports"
                  className="img-fluid mb-3"
                  style={{ borderRadius: "10px" }}
                />
                <h5 className="text-secondary">Customizable Reports</h5>
                <p>
                  Generate detailed reports tailored to your business needs for
                  better decision-making.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm">
                <img
                  src={bookkeepingImage}
                  alt="Bookkeeping"
                  className="img-fluid mb-3"
                  style={{ borderRadius: "10px" }}
                />
                <h5 className="text-secondary">User-Friendly Interface</h5>
                <p>
                  Navigate through the application with ease using our intuitive
                  and responsive design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div
          className="cta-section text-center py-5"
          style={{
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          <h2 className="mb-3">Ready to Get Started?</h2>
          <p className="lead">
            Join thousands of businesses using MSL Software to simplify their
            bookkeeping.
          </p>
          <Link className="btn btn-light btn-lg" to="/signup">
            Sign Up Now
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;