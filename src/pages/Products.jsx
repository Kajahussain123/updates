import React, { useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Header from "../components/Header";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const productList = Array(8).fill({
  title: "Boat Headphone",
  description: "Original Quality Boat Headphone 783264",
  price: "2500 Rs",
  imageUrl: "https://i.postimg.cc/0rgmk3g8/image-1.png", // Placeholder image
});

const FilterSection = () => {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Grid container spacing={2} sx={{ marginBottom: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">All Categories</MenuItem>
            {/* Add categories here */}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Brand</InputLabel>
          <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <MenuItem value="">All Brands</MenuItem>
            {/* Add brands here */}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Colour</InputLabel>
          <Select value={color} onChange={(e) => setColor(e.target.value)}>
            <MenuItem value="">All Colours</MenuItem>
            {/* Add colours here */}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Price</InputLabel>
          <Select value={price} onChange={(e) => setPrice(e.target.value)}>
            <MenuItem value="">From 0.00 Rs - 1000.00 Rs</MenuItem>
            {/* Add price ranges here */}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia component="img" height="140" image={product.imageUrl} alt={product.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
          <Typography variant="h6">{product.price}</Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddShoppingCartIcon />} // Add icon to button
            sx={{ marginLeft: 2 }}
          >
          Buy
          </Button>
        </Grid>
      </CardContent>
     
    </Card>
  );
};

const ProductGrid = () => {
  return (
    <Grid container spacing={3}>
      {productList.map((product, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

const ProductPage = () => {
  return (
    <div>
      <Header></Header>
      <Container sx={{ marginTop: 4 , marginBottom:4 }}>
        <FilterSection />
        <Typography variant="h5" gutterBottom>
          Result of Headphones:
        </Typography>
        <ProductGrid />
      </Container>
    </div>
  );
};

export default ProductPage;
