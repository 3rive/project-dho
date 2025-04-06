import BarChart from "components/BarChart";
import DonutChart from "components/DonutChart";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import TotalSales from "components/TotalSales"; // Import the new TotalSales component

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary py-3">Sales Dashboard</h1>

        {/* Total Sales Component */}
        <div className="row px-3 mb-4">
          <div className="col-sm-12">
            <TotalSales />
          </div>
        </div>

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
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;