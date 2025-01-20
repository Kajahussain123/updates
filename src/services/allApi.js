import axios from "axios";
import { commonApi } from "./commonApi";
import { BASE_URL } from "./baseUrl";

// add cctv services
export const submitCCTVService = async (data) => {
  try {
      const response = await commonApi('POST', `${BASE_URL}/CCTV-AC/users/cctv-add`, data);
      return response.data; 
  } catch (error) {
      console.error('Failed to submit CCTV service:', error);
      throw error; 
  }
};

// get cctv services and brands 
export const fetchCCTVProductDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product-details/CCTV`);
    return response.data[0]; 
  } catch (error) {
    console.error("Error fetching CCTV product details:", error);
    throw error;
  }
};

// add ac services
export const submitACService = async (data)=>{
  try{
    const response=await commonApi('POST',`${BASE_URL}/CCTV-AC/users/ac-add`,data);
    return response.data;
  } catch(error){
    console.error('Failed to submit AC service',error);
    throw error;
    
  }
};

// get ac services and brands 
export const fetchACProductDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product-details/AC`);
    return response.data[0]; 
  } catch (error) {
    console.error("Error fetching CCTV product details:", error);
    throw error;
  }
};

// add ac services
export const submitMobileService = async (formDataToSend) => {
  try {
    const response = await axios.post(`${BASE_URL}/mobile/service/add`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to submit mobile service:', error);
    throw error;
  }
};

// admin login
export const adminLogin = async (reqBody)=>{
  try{
    const response=await commonApi('POST',`${BASE_URL}/admin/login`,reqBody);
    return response.data;
  } catch(error){
    console.error('Failed to submit AC service',error);
    throw error;
  }
};

// get all mobile requiests
export const getMobileRequiest = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/mobile/service/get`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// get all mobile requiests
export const updateMobileStatus = async (reqBody, id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi("PATCH", `${BASE_URL}/mobile/update/status/${id}`, reqBody, headers);
    console.log("Update Status Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update mobile status:", error);
    throw error;
  }
};

// get all mobile requiests
export const deleteMobileRequest = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('DELETE', `${BASE_URL}/mobile/delete/service/${id}`,{}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// get all mobile requiests
export const getACCCTVRequest = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/CCTV-AC/services`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// get  cctv brands 
export const getCCTVBrands = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/product-details/CCTV`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// add brands 
export const addACCCTVBrands = async (reqBody, productId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('PATCH', `${BASE_URL}/product-details/brands/add/${productId}`,reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

export const updateACCCTVBrands = async (reqBody, productId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('PATCH', `${BASE_URL}/product-details/brands/edit/${productId}`,reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// delete brands 
export const deleteACCCTVBrands = async (brandName, productId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const requestBody = { brandName };
    const response = await commonApi('DELETE', `${BASE_URL}/product-details/brand/delete/${productId}`,requestBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to delete brand:', error);
    throw error;
  }
};

// get ac brands
export const getACBrands = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/product-details/AC`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// get  cctv brands 
export const getCCTVServices = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/product-details/CCTV`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// add services 
export const addACCCTVServices = async (reqBody, productId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('PATCH', `${BASE_URL}/product-details/service/add/${productId}`,reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// add services 
export const updateACCCTVServices = async (reqBody, productId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('PATCH', `${BASE_URL}/product-details/service/edit/${productId}`,reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// delete services 
export const deleteACCCTVServices = async (serviceName, productId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const requestBody = { serviceName };
    const response = await commonApi('DELETE', `${BASE_URL}/product-details/service/delete/${productId}`,requestBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to delete service:', error);
    throw error;
  }
};

// get ac services
export const getACServices = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/product-details/AC`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// Add accessory categories
export const addCategory = async (reqBody) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Ensure proper content type
    };

    // Ensure you include reqBody properly
    const response = await commonApi('POST', `${BASE_URL}/category/add`, reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to add category:', error);
    throw error;
  }
};

// get  accessory categories
export const getCategories = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/category/view`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// Add accessory categories
export const editCategory = async (reqBody,categoryId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Ensure proper content type
    };
    const response = await commonApi('PATCH', `${BASE_URL}/category/update/${categoryId}`, reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to add category:', error);
    throw error;
  }
};

// edit  accessory categories
export const deleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('DELETE', `${BASE_URL}/category/delete/${categoryId}`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// Add products
export const addProduct = async (reqBody) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',  // Ensure proper content type
    };
    const response = await commonApi('POST', `${BASE_URL}/accessory/admin/save`, reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to add category:', error);
    throw error;
  }
};

// edit product 
export const editProduct = async (reqBody , id) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',  // Ensure proper content type
    };
    const response = await commonApi('PATCH', `${BASE_URL}/accessory/admin/update/${id}`, reqBody, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to add category:', error);
    throw error;
  }
};

// delete product 
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('DELETE', `${BASE_URL}/accessory/admin/delete/${id}`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
};

// get  accessories
export const getProducts = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/accessory/user/get`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// add cctv services
export const getUserProducts = async () => {
  try {
      const response = await commonApi('GET', `${BASE_URL}/accessory/user/get`, );
      return response.data; 
  } catch (error) {
      console.error('Failed to submit CCTV service:', error);
      throw error; 
  }
};

// get all mobile requiests
export const updateACCCTVStatus = async (reqBody, id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi("PATCH", `${BASE_URL}/CCTV-AC/service/status/${id}`, reqBody, headers);
    console.log("Update Status Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update mobile status:", error);
    throw error;
  }
};

// get all mobile requiests
export const deleteACCCTVRequest = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('DELETE', `${BASE_URL}/CCTV-AC/delete/service/${id}`,{}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// get  counts
export const getCounts = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/accessory/user/view/counts`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// create order
export const createOrder = async (reqBody,productId) => {
  try {
      const response = await commonApi('POST', `${BASE_URL}/accessory/user/order/${productId}`, reqBody);
      return response.data; 
  } catch (error) {
      console.error('Failed to submit CCTV service:', error);
      throw error; 
  }
};

// get  orders
export const viewOrders = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('GET', `${BASE_URL}/accessory/admin/view/order`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mobile requests:', error);
    throw error;
  }
};

// update order status
export const updateOrderStatus = async (reqBody, id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi("PATCH", `${BASE_URL}/accessory/admin/update/status/${id}`, reqBody, headers);
    console.log("Update Status Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update mobile status:", error);
    throw error;
  }
};

// add testimonials
export const addTestimonials = async (reqBody) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi("POST", `${BASE_URL}/testimonials/create/`, reqBody, headers);
    console.log("Update Status Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update mobile status:", error);
    throw error;
  }
};

// add testimonials
export const getTestimonials = async () => {
  try {
      const response = await commonApi('GET', `${BASE_URL}/testimonials/get`, );
      return response.data; 
  } catch (error) {
      console.error('Failed to submit CCTV service:', error);
      throw error; 
  }
};

// update order status
export const updateTestimonials = async (reqBody, id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi("PATCH", `${BASE_URL}/testimonials/update/${id}`, reqBody, headers);
    console.log("Update Status Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update mobile status:", error);
    throw error;
  }
};

// delete testimonials
export const deleteTestimonials = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await commonApi('DELETE', `${BASE_URL}/testimonials/delete/${id}`, {}, headers);
    return response.data;
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    throw error;
  }
};
