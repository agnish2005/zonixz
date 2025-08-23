import React, { useState, useEffect, useRef } from 'react';
import './SingleCategorySlider.css';
import slider1 from '../assets/Image/slider1.png';
import slider2 from '../assets/Image/slider2.png';
import slider3 from '../assets/Image/slider3.png';
import slider4 from '../assets/Image/slider4.png';

const SingleCategorySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  
  const images = [
    { id: 1, name: "Category 1", image: slider1 },
    { id: 2, name: "Category 2", image: slider2 },
    { id: 3, name: "Category 3", image: slider3 },
    { id: 4, name: "Category 4", image: slider4 },
    { id: 5, name: "Category 5", image: slider1 },
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = index * window.innerWidth;
    }
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = currentSlide * window.innerWidth;
    }
  }, [currentSlide]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <div className="slider-container">
      <div 
        className="slider"
        ref={sliderRef}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        {images.map((item, index) => (
          <div 
            key={item.id} 
            className="slide"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        ))}
      </div>
      
      <div className="dots-container">
        {images.map((_, index) => (
          <span 
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleCategorySlider;