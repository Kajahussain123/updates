import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Header from "../components/Header";
import { getUserProducts, createOrder } from "../services/allApi";
import Loader from "../components/Loader";

// Modal Style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ProductCard = ({ product, onBuy }) => {
  const imageUrl = product.image[0] || "https://via.placeholder.com/150"; // Fallback image

  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={
          product.image && product.image.length > 0
            ? `https://updatessolutions.com/api/${product.image[0]}`
            : 'https://via.placeholder.com/140' // Fallback for missing images
        }
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
          <Typography variant="h6">{product.price} Rs</Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onBuy(product)}
          >
            Buy
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

const ProductGrid = ({ products, onBuy }) => (
  <Grid container spacing={3}>
    {products.map((product) => (
      <Grid item xs={12} sm={6} md={3} key={product._id}>
        <ProductCard product={product} onBuy={onBuy} />
      </Grid>
    ))}
  </Grid>
);

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getUserProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCustomerDetails({ customerName: "", phone_number: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = async () => {
    if (!selectedProduct) return;
    const reqBody = {
      customerName: customerDetails.customerName,
      phone_number: customerDetails.phone_number,
    };
    try {
      await createOrder(reqBody, selectedProduct._id);
      alert("Order created successfully!");
      const whatsappMessage = encodeURIComponent(
        `Order Details:\nProduct: ${selectedProduct.title}\nPrice: ${selectedProduct.price} Rs\nCustomer: ${reqBody.customerName}\nPhone: ${reqBody.phone_number}`
      );
      const whatsappURL = `https://wa.me/+916282675362?text=${whatsappMessage}`;
      window.open(whatsappURL, "_blank");
      handleModalClose();
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order.");
    }
  };

  
  if (loading) {
    return <Loader />; 
  }

  return (
    <div>
      <Header />
      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Result of Products:
        </Typography>
        {loading ? (
          <Typography variant="h6" textAlign="center">
            Loading products...
          </Typography>
        ) : products.length > 0 ? (
          <ProductGrid products={products} onBuy={handleBuyClick} />
        ) : (
          <Typography variant="h6" textAlign="center">
            No products found.
          </Typography>
        )}
      </Container>

      {/* Modal for customer details */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Enter Customer Details
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Customer Name"
            name="customerName"
            value={customerDetails.customerName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phone_number"
            value={customerDetails.phone_number}
            onChange={handleInputChange}
          />
          <Grid container justifyContent="flex-end" spacing={2} sx={{ marginTop: 2 }}>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleModalClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductPage;
