import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, Button, IconButton, Stack } from "@mui/material";
import { Email, Phone, LocationOn, Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader"; // Ensure you have a Loader component in your project
import { WhatsApp } from '@mui/icons-material';


const ContactUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const message = event.target.elements.message.value;

    // Redirect to WhatsApp with a pre-filled message
    const whatsappURL = `https://wa.me/+919207060879?text=${encodeURIComponent(
      `Hello, my name is ${name}. My email is ${email}. Message: ${message}`
    )}`;
    window.location.href = whatsappURL;
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: "2rem" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", fontFamily: "'Montserrat', sans-serif", marginBottom: "1rem", textAlign: "center" }}
        >
          Contact Us
        </Typography>

        {/* Company Details */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "1rem", fontFamily: "'Montserrat', sans-serif" }}
              >
                Get in Touch
              </Typography>
              <Stack direction="column" spacing={2}>
                <Box display="flex" alignItems="center">
                  <Email sx={{ marginRight: "0.5rem", color: "black" }} />
                  <Typography sx={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <b>Email</b>: updatessolutions9@gmail.com
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Phone sx={{ marginRight: "0.5rem", color: "black" }} />
                  <Typography sx={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <b>Phone</b>: +91 9207060879
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocationOn sx={{ marginRight: "0.5rem", color: "black" }} />
                  <Typography sx={{ fontFamily: "'Montserrat', sans-serif" }}><b>Address</b>: Alumkadavu PO, Karunagapally , Kerala</Typography>
                </Box>
              </Stack>

              {/* Social Media Links */}
              <Box sx={{ marginTop: "1.5rem" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "0.5rem", fontFamily: "'Montserrat', sans-serif" }}
                >
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#3b5998" }}>
                    <Facebook />
                  </IconButton>
                  <IconButton href="https://twitter.com" target="_blank" sx={{ color: "#00acee" }}>
                    <Twitter />
                  </IconButton>
                  <IconButton href="https://instagram.com" target="_blank" sx={{ color: "#C13584" }}>
                    <Instagram />
                  </IconButton>
                  <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "#0077b5" }}>
                    <LinkedIn />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "1rem", fontFamily: "'Montserrat', sans-serif" }}
              >
                Send a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "1rem" }}
                />
                <TextField
                  name="email"
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "1rem" }}
                />
                <TextField
                  name="message"
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ marginBottom: "1rem" }}
                />
                <Button variant="contained" sx={{backgroundColor:"black",color:"white"}} fullWidth type="submit">
                  Submit
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
      {/* WhatsApp Icon */}
      <a href="https://wa.me/+919207060879" target="_blank" rel="noopener noreferrer">
        <IconButton
          sx={{
            position: 'fixed',
            bottom: '30px',
            right: '40px',
            height:"50px",
            width:"50px",
            backgroundColor: '#25D366',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#128C7E',
            },
            fontSize: '5rem', // Increased icon size
          }}
        >
          <WhatsApp />
        </IconButton>
      </a>
    </div>
  );
};

export default ContactUs;
