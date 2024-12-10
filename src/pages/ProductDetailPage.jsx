import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Breadcrumbs from '../../src/components/ProductDetail/Breadcrumbs'
import ImageSlider from '../components/ProductDetail/ImageSlider';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import SupportInfo from '../components/ProductDetail/SupportInfo';
import HurryUpDeals from '../components/LandingPage/HurryUpDeals'
import Overview from '../components/ProductDetail/Overview';
import DetailsTable from '../components/ProductDetail/DetailsTable';
import RelatedProducts from '../components/ProductDetail/RelatedProducts';


const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const fetchRelatedProducts = async () => { 
      if (!product) return;

      try {
        const q = query(collection(db, "products"), where("category", "==", product.category));
        const querySnapshot = await getDocs(q);

        const relatedProducts = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((doc) => doc.id !== productId);

        setProducts(relatedProducts);

      } catch (error) {
        setError("Failed to fetch related products");
      }
    };

    fetchRelatedProducts();
  }, [product]);

  if (loading) return (
    <div className="flex items-center justify-center w-full h-[700px]">
      <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-bs-indigo"></div>
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <div className="py-[30px] px-5 md:px-[100px] flex flex-col mb-7 gap-[25px]">
      <Breadcrumbs category={product.category} name={product.name} />
      <div className='md:flex gap-[50px]'>
        <ImageSlider images={product.images} />
        <ProductInfo {...product} />
      </div>
      <SupportInfo />
      <div className="md:flex gap-[50px]">
        <Overview />
        <DetailsTable />
      </div>
      <RelatedProducts products={products} />
      <HurryUpDeals />
    </div>
  );
};

export default ProductDetailPage;
