import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Card, CardContent } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title, subtitle, description, image, bgColor, textColor, animation, redirectTo, isAvailable }) => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        if (isAvailable) {
            navigate(redirectTo);
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: bgColor,
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                opacity: isAvailable ? 1 : 0.5,
                '&:hover': {
                    transform: isAvailable ? 'scale(1.05)' : 'none',
                    boxShadow: isAvailable ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : 'none',
                },
            }}
            data-aos={animation}
        >
            <CardContent>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 400,
                        mb: 1,
                        fontFamily: "'Montserrat', sans-serif",
                        color: textColor,
                        textAlign: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <b>{title}</b>
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 400,
                        mb: 1,
                        fontFamily: "'Montserrat', sans-serif",
                        color: textColor,
                        fontWeight: 'lighter',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    {subtitle}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        mb: 1,
                        fontFamily: "'Montserrat', sans-serif",
                        marginTop: '10px',
                        color: 'rgba(0, 0, 0, 0.7)',
                    }}
                >
                    {description}
                </Typography>
                <Box
                    component="img"
                    src={image}
                    alt="service"
                    sx={{ width: '150px', margin: '20px auto', display: 'block' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {isAvailable ? (
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
                    ) : (
                        <Typography
                            sx={{
                                color: 'gray',
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                            }}
                        >
                            Coming Soon
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

const ServicesPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleViewMoreClick = () => {
        navigate('/viewmore'); // Navigate to the 'more services' page
    };

    return (
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
                <b>Our Services</b>
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 400,
                    mb: 1,
                    fontFamily: "'Montserrat', sans-serif",
                    marginBottom: '40px',
                    color: 'gray',
                }}
                data-aos="fade-up"
            >
                Explore our expert services in mobile repairs, mobile accessories, AC installation and repairs, and CCTV installations.
                We provide reliable and efficient solutions for your home and business needs.
            </Typography>
            <Grid container spacing={4}>
                {/* CCTV Installation Section */}
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="CCTV Installation & Repair"
                        subtitle="Enhanced Security"
                        description="Ensure your safety with our CCTV installation and repair services. We provide professional surveillance solutions for homes and businesses."
                        image="https://i.ibb.co/Vqsycmw/image-27.png"
                        bgColor="#FDEDEC"
                        textColor="#E74C3C"
                        animation="fade-down"
                        redirectTo="/cctv-form"
                        isAvailable={true} // Enabled
                    />
                </Grid>
                {/* Mobile Repair */}
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="Mobile Repair"
                        subtitle="Quick & Reliable"
                        description="Get your mobile repaired at your convenience. We offer screen repairs, battery replacements, and more for all phone brands."
                        image="https://i.ibb.co/YcJFS8W/image-25.png"
                        bgColor="#FDEDEC"
                        textColor="#E74C3C"
                        animation="fade-up"
                        redirectTo="/contact"
                        isAvailable={false} // Disabled
                    />
                </Grid>
                {/* AC Installation & Repair */}
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="AC Installation & Repair"
                        subtitle="Stay Cool All Year"
                        description="Our expert technicians offer fast AC installation and repair services for residential and commercial spaces."
                        image="https://i.postimg.cc/ZRtrYWQV/pngegg.png"
                        bgColor="#E8F6F3"
                        textColor="#16A085"
                        animation="fade-up"
                        redirectTo="/ac-form"
                        isAvailable={false} // Disabled
                    />
                </Grid>
                
                {/* Mobile Accessories Section */}
                <Grid item xs={12} md={6}>
                    <ServiceCard
                        title="Mobile Accessories"
                        subtitle="Top-Quality Products"
                        description="We offer a wide range of mobile accessories including chargers, headphones, cases, and more to keep your device running smoothly."
                        image="https://i.ibb.co/HY8D5fz/image-26.png"
                        bgColor="#E8F6F3"
                        textColor="#16A085"
                        animation="fade-down"
                        redirectTo="/products"
                        isAvailable={false} // Disabled
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        borderRadius: '25px',
                        padding: '10px 30px',
                        '&:hover': { backgroundColor: '#333' },
                    }}
                    onClick={handleViewMoreClick}
                >
                    View More
                </Button>
            </Box>
        </Container>
    );
};

export default ServicesPage;
