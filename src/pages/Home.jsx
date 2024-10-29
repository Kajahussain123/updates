import React from 'react'
import Header from '../components/Header'
import ServiceHub from '../components/Home/Section1'
import AboutUs from '../components/Home/WhoWeAre'
import Services from '../components/Home/Services'
import Testimonials from '../components/Home/Testimonials'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
       <div> <Header></Header></div>
       <div><ServiceHub></ServiceHub></div>
       <div><AboutUs></AboutUs></div>
       <div><Services></Services></div>
       <div><Testimonials></Testimonials></div>
       <div><Footer></Footer></div>
    </div>
  )
}

export default Home