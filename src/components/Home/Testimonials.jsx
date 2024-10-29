import React from 'react';
import { Container, Typography, Avatar, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Slider from 'react-slick';

// Array of testimonial details
const testimonialsData = [
  {
    stars: 5,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
    authorName: "Sruthi Sivadas",
    authorRole: "Mobile Repair",
    avatar: "https://example.com/avatar-sruthi.png",
  },
  {
    stars: 5,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
    authorName: "Manu Krishna",
    authorRole: "Accessories",
    avatar: "https://example.com/avatar-manu.png",
  },
  {
    stars: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    authorName: "Nisha Raj",
    authorRole: "CCTV Installations",
    avatar: "https://example.com/avatar-nisha.png",
  },
  {
    stars: 4,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
    authorName: "Rajesh Kumar",
    authorRole: "SIM Activation",
    avatar: "https://example.com/avatar-rajesh.png",
  },
];

// TestimonialCard Component
const TestimonialCard = ({ stars, text, authorName, authorRole, avatar }) => {
  return (
    <Box
      sx={{
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        margin: '0 10px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        {[...Array(stars)].map((_, index) => (
          <StarIcon key={index} sx={{ color: '#f1c40f' }} />
        ))}
      </Box>
      <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.7)', marginBottom: '20px' }}>
        {text}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar src={avatar} alt={authorName} sx={{ width: 50, height: 50, marginRight: '10px' }} />
        <Box>
          <Typography sx={{ fontWeight: 'bold', color: '#E74C3C' }}>{authorName}</Typography>
          <Typography sx={{ color: 'gray', fontSize: '0.9rem' }}>{authorRole}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Testimonials = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // 3 seconds interval for each slide
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ marginBottom: '50px' }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Testimonials
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '40px', color: 'gray' }}>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
      </Typography>

      {/* Carousel Component */}
      <Slider {...settings}>
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </Slider>
    </Container>
  );
};

export default Testimonials;
