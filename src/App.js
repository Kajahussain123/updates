import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MobilePhoneForm from './pages/MobileRepair/Form1';
import ContactDetailsForm from './pages/MobileRepair/ContactDetails';
import SubmissionSuccess from './pages/MobileRepair/Submission';
import CCTVForm from './pages/CCTV/Form1';
import ContactCCTV from './pages/CCTV/ContactCCTV';
import CCTVSubmission from './pages/CCTV/Submission';
import ProductPage from './pages/Products';
import ACForm from './pages/AC/Form1';
import ContactAC from './pages/AC/Contact';
import ACSubmission from './pages/AC/Submission';
import LoginPage from './Admin/pages/AdminLogin';
import MobileOrders from './Admin/pages/MobileOrders';
import CCTVOrders from './Admin/pages/CCTVOrders';
import AddCCTVBrand from './Admin/pages/AddCCTVBrands';
import AddCCTVService from './Admin/pages/AddCCTVService';
import ACOrders from './Admin/pages/ACOrders';
import AddACBrand from './Admin/pages/AddACBrands';
import AddACService from './Admin/pages/AddACService';
import AddProduct from './Admin/pages/AddProducts';
import ViewProducts from './Admin/pages/ViewProducts';
import AddProductsCategory from './Admin/pages/AddProductsCategory';
import Dashboard from './Admin/pages/Overview';
import Services from './pages/Services';
import Aboutus from './pages/Aboutus';
import ViewAccessoryOrders from './Admin/pages/ViewOrders';
import AddTestimonial from './Admin/pages/Testimonials';
import ContactUs from './pages/ContactUs';
import ViewMore from './components/Home/ViewMore';

// PrivateRoute Component
const PrivateRoute = ({ element: Component }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? <Component /> : <Navigate to="/admin-login" />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/mobile" element={<MobilePhoneForm />} />
        <Route path="/contact" element={<ContactDetailsForm />} />
        <Route path="/submission" element={<SubmissionSuccess />} />
        <Route path="/cctv-form" element={<CCTVForm />} />
        <Route path="/contact-cctv" element={<ContactCCTV />} />
        <Route path="/cctv-submission" element={<CCTVSubmission />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/ac-form" element={<ACForm />} />
        <Route path="/contact-ac" element={<ContactAC />} />
        <Route path="/ac-submission" element={<ACSubmission />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/viewmore" element={<ViewMore />} />


        {/* Protected Admin Routes */}
        <Route path="/admin-mobile" element={<PrivateRoute element={MobileOrders} />} />
        <Route path="/admin-cctv" element={<PrivateRoute element={CCTVOrders} />} />
        <Route path="/admin-cctv-add" element={<PrivateRoute element={AddCCTVBrand} />} />
        <Route path="/admin-cctv-services" element={<PrivateRoute element={AddCCTVService} />} />
        <Route path="/admin-ac" element={<PrivateRoute element={ACOrders} />} />
        <Route path="/admin-ac-add" element={<PrivateRoute element={AddACBrand} />} />
        <Route path="/admin-ac-services" element={<PrivateRoute element={AddACService} />} />
        <Route path="/admin-addProduct" element={<PrivateRoute element={AddProduct} />} />
        <Route path="/admin-viewProducts" element={<PrivateRoute element={ViewProducts} />} />
        <Route path="/admin-addProducts-category" element={<PrivateRoute element={AddProductsCategory} />} />
        <Route path="/admin-overview" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/admin-vieworders" element={<PrivateRoute element={ViewAccessoryOrders} />} />
        <Route path="/admin-testimonials" element={<PrivateRoute element={AddTestimonial} />} />
      </Routes>
    </div>
  );
}

export default App;
