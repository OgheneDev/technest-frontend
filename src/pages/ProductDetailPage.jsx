import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Breadcrumbs from '../../src/components/ProductDetail/Breadcrumbs'
import ImageSlider from '../components/ProductDetail/ImageSlider';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import SupportInfo from '../components/ProductDetail/SupportInfo';
import HurryUpDeals from '../components/LandingPage/HurryUpDeals'
import Overview from '../components/ProductDetail/Overview';
import DetailsTable from '../components/ProductDetail/DetailsTable';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="py-[30px] px-5 flex flex-col mb-7 gap-[25px]">
      <Breadcrumbs category={product.category} name={product.name} />
      <ImageSlider images={product.images} />
      <ProductInfo {...product} />
      <SupportInfo />
      <Overview />
      <DetailsTable />
      <HurryUpDeals />
    </div>
  );
};

export default ProductDetailPage;
