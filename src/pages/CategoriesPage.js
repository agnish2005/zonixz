import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './CategoriesPage.css';
import cement from '../assets/Image/a.png';
import b from '../assets/Image/b.png';
import c from '../assets/Image/c.png';

const CategoriesPage = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigate = useNavigate();

  const categoriesData = [
    {
      id: 1,
      name: 'Cements',
      icon: cement,
      subcategories: ['OPC 43 Grade', 'OPC 53 Grade', 'PPC', 'White Cement', 'OPC 43 Grade']
    },
    {
      id: 2,
      name: 'Bricks & Blocks',
      icon: b,
      subcategories: ['Red Bricks', 'Concrete Blocks', 'AAC Blocks', 'Fly Ash Bricks']
    },
    {
      id: 3,
      name: 'Steel',
      icon: c,
      subcategories: ['TMT Rebars (Fe 500)', 'TMT Rebars (Fe 550)', 'Structural Steel']
    },
    {
      id: 4,
      name: 'Cements',
      icon: cement,
      subcategories: ['OPC 43 Grade', 'OPC 53 Grade', 'PPC', 'White Cement']
    },
    {
      id: 5,
      name: 'Bricks & Blocks',
      icon: b,
      subcategories: ['Red Bricks', 'Concrete Blocks', 'AAC Blocks', 'Fly Ash Bricks']
    },
    {
      id: 6,
      name: 'Steel',
      icon: c,
      subcategories: ['TMT Rebars (Fe 500)', 'TMT Rebars (Fe 550)', 'Structural Steel']
    },
    {
      id: 7,
      name: 'Cements',
      icon: cement,
      subcategories: ['OPC 43 Grade', 'OPC 53 Grade', 'PPC', 'White Cement']
    },
    {
      id: 8,
      name: 'Bricks & Blocks',
      icon: b,
      subcategories: ['Red Bricks', 'Concrete Blocks', 'AAC Blocks', 'Fly Ash Bricks', 'R...']
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    // Navigate to the category list page with state
    navigate('/category-list', { 
      state: { 
        subcategoryName: subcategoryName 
      } 
    });
  };

  return (
    <div className="categories-page-main">
      {categoriesData.map((category) => (
        <div key={category.id} className="category-item-main">
          <div 
            className="category-header-main"
            onClick={() => toggleCategory(category.id)}
          >
            <div className="category-icon-wrapper">
              <img 
                src={category.icon} 
                alt={category.name}
                className="category-icon-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="category-icon-fallback" style={{display: 'none'}}>
                {category.name === 'Cements' && '🏗️'}
                {category.name === 'Bricks & Blocks' && '🧱'}
                {category.name === 'Steel' && '⚙️'}
              </div>
            </div>
            
            <div className="category-content-wrapper">
              <h3 className="category-title-main">{category.name}</h3>
              <p className="category-subcategories-text">
                {category.subcategories.join(', ')}
              </p>
            </div>
            
            <div className="category-dropdown-arrow">
              {expandedCategories[category.id] ? (
                <IoIosArrowUp className="arrow-icon-main" />
              ) : (
                <IoIosArrowDown className="arrow-icon-main" />
              )}
            </div>
          </div>
          
          {expandedCategories[category.id] && (
            <div className="category-expanded-list">
              {category.subcategories.map((subcategory, index) => (
                <div 
                  key={index} 
                  className="subcategory-item-main"
                  onClick={() => handleSubcategoryClick(category.name, subcategory)}
                >
                  {subcategory}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;