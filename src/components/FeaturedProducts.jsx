import React, { useEffect, useState } from 'react';
import { useFeaturedProducts } from '../context/FeaturedProductsContext';

const FeaturedProducts = () => {
  const { products, fetchFeaturedProducts } = useFeaturedProducts();
  const [selectedCategory, setSelectedCategory] = useState('cases');

  // Fetch "cases" category by default on component mount
  useEffect(() => {
    fetchFeaturedProducts('cases');
  }, []);

  // Fetch products when the selected category changes
  useEffect(() => {
    if (selectedCategory !== 'cases') {
      fetchFeaturedProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h3>Featured Products</h3>
      <div className="toggle-buttons">
        <button onClick={() => handleCategoryChange('cases')}>Cases</button>
        <button onClick={() => handleCategoryChange('chargers')}>Chargers</button>
        <button onClick={() => handleCategoryChange('cables')}>Cables</button>
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-item">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <img src={product.images[0]} alt={product.name} />
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;

