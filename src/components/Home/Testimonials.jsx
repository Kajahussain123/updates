import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getTestimonials } from '../../services/allApi';

// Function to render star ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} style={{ color: '#FFD700', marginRight: '4px' }} />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} style={{ color: '#FFD700', marginRight: '4px' }} />);
    } else {
      stars.push(<FaRegStar key={i} style={{ color: '#FFD700', marginRight: '4px' }} />);
    }
  }
  return stars;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        console.log('Fetched testimonials:', data); // Debug log for API response
        setTestimonials(data.allTestimonial || []); // Ensure `allTestimonial` is an array
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return <div>No testimonials available at the moment.</div>;
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', textAlign: 'center', position: 'relative' }}>
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333', fontFamily: "'Montserrat', sans-serif" }}>
      What Our Clients Say
    </h2>
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      style={{
        padding: '1rem',
        '--swiper-pagination-bottom': '-2px', // Adjust pagination position here
      }}
    >
      {testimonials.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '2rem',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <FaQuoteLeft style={{ fontSize: '2rem', color: '#a89160', marginBottom: '1rem' }} />
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: '#555' }}>{item.description}</p>
            <FaQuoteRight style={{ fontSize: '2rem', color: '#a89160', marginBottom: '1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              {renderStars(item.Rating)}
            </div>
            <h4 style={{ margin: 0, color: '#333' }}>{item.Name}</h4>
            <p style={{ margin: 0, color: '#666' }}>{item.service}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  
  );
};

export default Testimonials;
