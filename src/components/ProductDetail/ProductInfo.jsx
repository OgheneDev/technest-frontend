import { CalendarCheckIcon, CircleHelp, Star } from 'lucide-react';

const renderStars = (rating) =>
  [...Array(5)].map((_, index) => (
    <Star
      key={index}
      size={17}
      className={index < rating ? 'fill-yellow-600 text-yellow-600' : 'text-gray-300'}
    />
  ));

const ProductInfo = ({ name, rating, price, description, category }) => (
  <div className="text-container">
    <h1 className="text-3xl font-bold mb-2">{name}</h1>
    <div className="flex gap-1 mb-7">{renderStars(rating)}</div>
    <p className="text-2xl font-bold mb-7">${price} - $100</p>
    <p className="text-[#777] mb-4">{description}</p>
    <p className="font-semibold uppercase mb-4">
      <span className="text-[#777] font-normal">Category: </span>
      {category}
    </p>
    <div className="flex gap-3 mb-4">
      <CalendarCheckIcon size={40} />
      <p>Order now and ships by Tue, Mar 12</p>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex items-center text-[13px] gap-2 bg-bs-light p-3 px-5 rounded-lg w-fit">
        <CircleHelp size={27} />
        <span>Need Help? Chat with an Expert</span>
      </div>
    </div>
  </div>
);

export default ProductInfo;