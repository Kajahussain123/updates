import React from 'react';
import Header from '../components/Header';
import ServiceHub from '../components/Home/Section1';
import AboutUs from '../components/Home/WhoWeAre';
import Services from '../components/Home/Services';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Footer';
import { IconButton } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';

function Home() {
  return (
    <div>
      <Header />
      <div id="serviceHub"><ServiceHub /></div>
      <div id="aboutUs"><AboutUs /></div>
      <div id="services"><Services /></div>
      <div id="testimonials"><Testimonials /></div>
      <div><Footer /></div>

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
}

export default Home;
