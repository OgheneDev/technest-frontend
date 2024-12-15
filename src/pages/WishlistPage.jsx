import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Trash2, MoveRight, Star } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? "fill-[#444] text-[#444]" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-bs-indigo"></div>
      </div>
    );
  }

  return (
    <div className="px-[20px] md:px-[100px] py-[30px]">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Heart size={30} /> My Wishlist
        </h1>
        <p className="text-gray-500">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={50} className="mx-auto mb-5 text-gray-300" />
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items to your wishlist yet.
          </p>
          <Link 
            to="/shop" 
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div 
              key={product.id} 
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-[250px] object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                >
                  <Trash2 size={20} className="text-red-500" />
                </button>
              </div>
              
              <div className="p-4 flex-grow">
                <span className="text-sm text-gray-500 uppercase">
                  {product.category}
                </span>
                <h2 className="text-xl font-bold mt-2 mb-3">{product.name}</h2>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1">
                    {renderStars(4)} {/* Default to 4 stars if no rating */}
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    to={`/product/${product.id}`}
                    className="flex-grow bg-black text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                  >
                    View Details <MoveRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;