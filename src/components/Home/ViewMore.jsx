import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button, Card, CardContent } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Loader from '../Loader';
import { IconButton } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';

import Footer from '../Footer';

const ServiceCard = ({ title, description, image, bgColor, textColor, animation }) => {
    const navigate = useNavigate();

    const handleContactUsClick = () => {
        navigate('/contactus'); // Navigate to the contact page
    };

    return (
        <Card
            sx={{
                backgroundColor: bgColor,
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '90%', // Ensures all cards have the same height
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
            }}
            data-aos={animation}
        >
            <CardContent>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 400,
                        mb: 2,
                        fontFamily: "'Montserrat', sans-serif",
                        color: textColor,
                        textAlign: 'center',
                    }}
                >
                    <b>{title}</b>
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        mb: 3,
                        fontFamily: "'Montserrat', sans-serif",
                        color: 'rgba(0, 0, 0, 0.7)',
                        textAlign: 'center',
                    }}
                >
                    {description}
                </Typography>
                <Box
                    component="img"
                    src={image}
                    alt={title}
                    sx={{
                        width: '150px',
                        margin: '20px auto',
                        display: 'block',
                    }}
                />
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        borderRadius: '25px',
                        padding: '10px 20px',
                        '&:hover': { backgroundColor: '#333' },
                    }}
                    onClick={handleContactUsClick}
                >
                    Contact Us
                </Button>
            </Box>
        </Card>
    );
};

const ViewMore = () => {
    const [loading, setLoading] = useState(true); // Initialize loading state
    const services = [
        {
            title: 'Home Automation',
            description: 'Simplify your life with cutting-edge home automation solutions.',
            image: 'https://i.postimg.cc/JnhHxVyw/55805-removebg-preview.png',
            bgColor: '#ECF4EE',
            textColor: '#000',
            animation: 'fade-up',
        },
        {
            title: 'Solar Panels Installation',
            description: 'Harness the power of the sun with our efficient solar panel systems.',
            image: 'https://i.postimg.cc/cCLCRVJK/solar-panel-removebg-preview.png',
            bgColor: '#F9E5D8',
            textColor: '#000',
            animation: 'fade-up',
        },
        {
            title: 'Idiminnal Reksha Jalakam',
            description: 'Innovative solutions for safety and security in modern homes.',
            image: 'https://i.postimg.cc/FH6rfD8Z/silicone-housing-arrester-lightning-for-over47162861654-removebg-preview.png',
            bgColor: '#EDECF2',
            textColor: '#000',
            animation: 'fade-up',
        },
        {
            title: 'Billing Software',
            description: 'Streamline your business operations with our efficient billing software.',
            image: 'https://i.postimg.cc/9XwGf2Yn/rb-4323.png', // Replace with actual image URL
            bgColor: '#F5F1E4',
            textColor: '#000',
            animation: 'fade-up',
        },
    ];

    // Simulate data loading
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);

        AOS.init({ duration: 1000, once: true });
    }, []);

    if (loading) {
        return <Loader />; // Display loader while loading
    }

    return (
        <div>
            <Header />
            <Container sx={{ marginBottom: '100px' }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: 400,
                        mb: 1,
                        fontFamily: "'Montserrat', sans-serif",
                    }}
                    data-aos="fade-down"
                >
                    <b>Our Other Services</b>
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 400,
                        mb: 4,
                        fontFamily: "'Montserrat', sans-serif",
                        color: 'gray',
                    }}
                    data-aos="fade-up"
                >
                    Explore our innovative and reliable solutions tailored to modern needs. Our services are designed to enhance your lifestyle and ensure your comfort and safety.
                </Typography>
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ServiceCard {...service} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer></Footer>
            <a href="https://wa.me/+919207060879" target="_blank" rel="noopener noreferrer">
                <IconButton
                    sx={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '40px',
                        height: "50px",
                        width: "50px",
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

export default ViewMore;
