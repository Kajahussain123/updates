import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Card, CardContent } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title, subtitle, description, image, bgColor, textColor, animation,redirectTo }) => {

    const navigate = useNavigate(); // Create a navigate function

    const handleGetStartedClick = () => {
        navigate(redirectTo); // Navigate to the specified path
    };

    return (
        <Card
            sx={{
                backgroundColor: bgColor,
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition for hover effects
                '&:hover': {
                    transform: 'scale(1.05)', // Slight scaling effect on hover
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                },
            }}
            data-aos={animation} // Apply the AOS animation passed from the props
        >
            <CardContent>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', color: textColor, textAlign: 'center', marginBottom: '10px' }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ color: textColor, fontWeight: 'lighter', textAlign: 'center', marginBottom: '20px' }}
                >
                    {subtitle}
                </Typography>
                <Typography sx={{ marginTop: '10px', color: 'rgba(0, 0, 0, 0.7)' }}>
                    {description}
                </Typography>
                <Box
                    component="img"
                    src={image}
                    alt="service"
                    sx={{ width: '150px', margin: '20px auto', display: 'block' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            borderRadius: '25px',
                            padding: '10px 20px',
                            '&:hover': { backgroundColor: '#333' },
                        }}
                        onClick={handleGetStartedClick}
                    >
                        Get Started
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

const Services = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Initialize AOS with duration and once for animation to happen only once
    }, []);

    return (
        <Container sx={{ marginBottom: '100px' }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }} data-aos="fade-down">
                Our Services
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '40px', color: 'gray' }} data-aos="fade-up">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="Fix your mobile"
                        subtitle="at your Home"
                        description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                        image="https://i.ibb.co/YcJFS8W/image-25.png"
                        bgColor="#FDEDEC"
                        textColor="#E74C3C"
                        animation="fade-up" // Animation for this card
                        redirectTo="/mobile" 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="Find top-quality"
                        subtitle="Mobile Accessories"
                        description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                        image="https://i.ibb.co/HY8D5fz/image-26.png"
                        bgColor="#E8F6F3"
                        textColor="#16A085"
                        animation="fade-down" // Animation for this card
                        redirectTo="/products" 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="Secure your"
                        subtitle="space with CCTV"
                        description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                        image="https://i.ibb.co/Vqsycmw/image-27.png"
                        bgColor="#FDEDEC"
                        textColor="#E74C3C"
                        animation="fade-up" // Animation for this card
                        redirectTo="/cctv-form"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="Stay connected with"
                        subtitle="Fats AC Services"
                        description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                        image="https://i.postimg.cc/ZRtrYWQV/pngegg.png"
                        bgColor="#E8F6F3"
                        textColor="#16A085"
                        animation="fade-down" // Animation for this card
                        redirectTo="/ac-form"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Services;
