import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/slices/productsSlice';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct(id)); // Fetch product details using the ID
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <p>${product?.price}</p>
      <p>Stock: {product?.stock}</p>
      {product?.image && (
        <img src={product.image} alt={product.name} style={{ maxWidth: '200px' }} />
      )}
      {/* Add to cart button can be implemented here */}
    </div>
  );
};

export default ProductDetail;
