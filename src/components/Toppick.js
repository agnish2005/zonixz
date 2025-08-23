import React from 'react';
import './Toppick.css';

// Import local images
import brand1 from '../assets/Image/brand1.png';
import brand2 from '../assets/Image/brand2.png';
import brand3 from '../assets/Image/brand3.png';
import marble1 from '../assets/Image/brand1.png';

const Toppick = () => {
  return (
    <div className="toppick-container">
      <h2 className="toppick-title">Top Picks For You</h2>
      <div className="toppick-cards-scroll-container">
        <div className="toppick-cards-wrapper">
          {/* Card 1 */}
          <div className="toppick-card">
            <img src={brand1} alt="Product 1" className="toppick-card-image" />
            <div className="toppick-card-content">
              <h3 className="toppick-card-title">Product Title 1</h3>
              <p className="toppick-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className="toppick-card-price">$19.99</p>
            </div>
            <button className="toppick-card-button">Add to Cart</button>
          </div>

          {/* Card 2 */}
          <div className="toppick-card">
            <img src={brand2} alt="Product 2" className="toppick-card-image" />
            <div className="toppick-card-content">
              <h3 className="toppick-card-title">Product Title 2</h3>
              <p className="toppick-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className="toppick-card-price">$24.99</p>
            </div>
            <button className="toppick-card-button">Add to Cart</button>
          </div>

          {/* Card 3 */}
          <div className="toppick-card">
            <img src={brand3} alt="Product 3" className="toppick-card-image" />
            <div className="toppick-card-content">
              <h3 className="toppick-card-title">Product Title 3</h3>
              <p className="toppick-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className="toppick-card-price">$29.99</p>
            </div>
            <button className="toppick-card-button">Add to Cart</button>
          </div>

          {/* Card 4 */}
          <div className="toppick-card">
            <img src={marble1} alt="Product 4" className="toppick-card-image" />
            <div className="toppick-card-content">
              <h3 className="toppick-card-title">Product Title 4</h3>
              <p className="toppick-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className="toppick-card-price">$34.99</p>
            </div>
            <button className="toppick-card-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toppick;
