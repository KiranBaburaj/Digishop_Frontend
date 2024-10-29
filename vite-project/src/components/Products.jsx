import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {items.map((product) => (
        <div key={product.id} className="product">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }} // Adjust styling as needed
            />
          )}
          <Link to={`/products/${product.id}`}>View Details</Link> {/* Link to Product Detail */}
        </div>
      ))}
    </div>
  );
};

export default Products;
