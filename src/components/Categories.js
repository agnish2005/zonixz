// CategoryMobile.jsx
import React from 'react';
import './Categories.css';
import cement from '../assets/Image/a.png';
import b from '../assets/Image/b.png';
import c from '../assets/Image/c.png';

const Categories = () => {
  const categories = [
    { id: 1, name: "Electronics", image: cement },
    { id: 2, name: "Fashion", image: b },
    { id: 3, name: "Home & Kitchen", image: c },
    { id: 4, name: "Beauty", image: cement },
    { id: 5, name: "Sports", image: b },
    { id: 6, name: "Books", image: c },
    { id: 7, name: "Toys", image: cement },
  ];

  return (
    <div className="category-mobile-section">
      <h2 className="category-mobile-heading">Categories</h2>
      <div className="category-mobile-container">
        {categories.map((category) => (
          <div key={category.id} className="category-mobile-item">
            <img 
              src={category.image} 
              alt={category.name} 
              className="category-mobile-image" 
            />
            <p className="category-mobile-text">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Categories;