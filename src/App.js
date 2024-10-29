import { Route, Routes } from 'react-router-dom';
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
import AdminHeader from './Admin/components/Header';
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
import AddProductBrand from './Admin/pages/AddProductBrand';
import Dashboard from './Admin/pages/Overview';


function App() {
  return (
    <div className="App">
     <Routes>
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

     <Route path="/admin-login" element={<LoginPage />} />
     <Route path="/admin-mobile" element={<MobileOrders />} />
     <Route path="/admin-cctv" element={<CCTVOrders />} />
     <Route path="/admin-cctv-add" element={<AddCCTVBrand />} />
     <Route path="/admin-cctv-services" element={<AddCCTVService />} />
     <Route path="/admin-ac" element={<ACOrders />} />
     <Route path="/admin-ac-add" element={<AddACBrand />} />
     <Route path="/admin-ac-services" element={<AddACService />} />
     <Route path="/admin-addProduct" element={<AddProduct />} />
     <Route path="/admin-viewProducts" element={<ViewProducts />} />
     <Route path="/admin-addProducts-category" element={<AddProductsCategory />} />
     <Route path="/admin-addProducts-brand" element={<AddProductBrand />} />
     <Route path="/admin-overview" element={<Dashboard />} />

     </Routes>
    </div>
  );
}

export default App;
