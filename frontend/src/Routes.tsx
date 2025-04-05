import Dashboard from 'pages/Dashboard';
import Home from 'pages/Home';
import StoreManagement from 'pages/StoreManagement';
import ProductManagement from "pages/ProductManagement";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stores" element={<StoreManagement />} />
        <Route path="/products" element={<ProductManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;