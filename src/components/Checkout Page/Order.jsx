import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { X, Plus, Minus, CreditCard, Truck, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import placeholderImg from '../../assets/images/shop50-product-14-4-600x600.jpg';
import Swal from 'sweetalert2';

const Order = () => {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    // Predefined promo codes
    const PROMO_CODES = {
        'SUMMER2024': 0.10,  // 10% off
        'WELCOME': 0.15,     // 15% off
        'FIRST10': 0.05      // 5% off
    };

    const handleRemoveItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };
    
    const handleIncrementQuantity = (id) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } });
    };
    
    const handleDecrementQuantity = (id) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } });
    };

    const applyPromoCode = () => {
        const normalizedCode = promoCode.toUpperCase().trim();
        if (PROMO_CODES[normalizedCode]) {
            setDiscount(PROMO_CODES[normalizedCode]);
            Swal.fire({
             title: "Success!",
             text: `Promo code applied! ${PROMO_CODES[normalizedCode] * 100}% discount.`,
             icon: "success"
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: `Invalid promo code`,
                icon: "error"
            });
            setDiscount(0);
        }
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        localStorage.setItem('paymentMethod', method);
    };

    const handlePlaceOrder = () => {
        // Validate order placement
        const billingDetails = JSON.parse(localStorage.getItem('billingDetails') || '{}');
        
        if (!billingDetails.firstName) {
            Swal.fire({
                title: "Warning!",
                text: `Please complete your billing details first`,
                icon: "warning"
            });
            navigate('/checkout');
            return;
        }
        
        if (!paymentMethod) {
            Swal.fire({
                title: "Warning!",
                text: `Please select a payment method`,
                icon: "warning"
            });
            return;
        }

        // Prepare order details
        const orderDetails = {
            items: state.items,
            totalPrice: state.totalPrice,
            discountedPrice: state.totalPrice * (1 - discount),
            paymentMethod,
            billingDetails,
            orderDate: new Date().toISOString(),
            orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`
        };

        // Save order details (you could use Firebase here)
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

        // Navigate to order complete
        navigate('/order-complete');
    };

    const shippingCost = 0; // Flat rate shipping cost
    const subtotal = state.totalPrice;
    const discountAmount = subtotal * discount;
    const totalWithDiscount = subtotal - discountAmount;
    const totalWithShipping = totalWithDiscount + shippingCost;

    return (
        <div className='md:w-[65%] w-[90%] mx-auto mb-[50px] bg-white border-2 md:px-[40px] text-dark px-5 py-7'>
            <h2 className='uppercase text-dark text-xl mb-5 font-bold md:text-[18px]'>Your Order</h2>
            
            {/* Order Items */}
            <div className="product">
                <h3 className='uppercase font-bold text-[18px] md:text-[16px] md:font-semibold text-dark mb-5'>Product</h3>
                {state.items.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                    <div className="flex flex-col gap-5">
                        {state.items.map((item) => (
                            <div
                                key={item.id}
                                className='flex items-start gap-5 text-dark mb-[40px] relative'
                            >
                                <div className="image">
                                    <img
                                        src={item.images && item.images.length > 0 ? item.images[0] : placeholderImg}
                                        className='w-[120px] h-[120px] md:w-[80px] md:h-[80px] object-cover'
                                        alt={item.name || 'Product image'} 
                                    />
                                </div>
                                <div className="info w-full">
                                    <p className='break-words font-semibold md:font-normal mb-2'>{item.name}</p>
                                    <div className='md:flex md:justify-between md:items-center'>
                                        <div className="quantity mb-2 flex items-center">
                                            <button
                                                className="p-2 border flex items-center justify-center"
                                                onClick={() => handleDecrementQuantity(item.id)}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="p-2 font-semibold border">{item.quantity}</span>
                                            <button
                                                className="p-2 border flex items-center justify-center"
                                                onClick={() => handleIncrementQuantity(item.id)}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <p className='font-bold text-[18px] md:font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className='absolute top-0 right-0 bg-white flex justify-center shadow-lg rounded-full p-2'
                                    >
                                        <X size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Promo Code Section */}
            <div className="promo-section flex flex-col md:flex-row items-center gap-2 mb-5">
                <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="border p-2 w-full md:w-auto"
                />
                <button 
                    onClick={applyPromoCode}
                    className="bg-dark text-white px-4 py-2 w-full md:w-auto"
                >
                    Apply
                </button>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
                <div className="flex justify-between py-2 border-b text-dark">
                    <p className='font-semibold'>Subtotal</p>
                    <span className='font-bold text-[18px]'>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between py-2 border-b text-green-600">
                        <p className='font-semibold'>Discount</p>
                        <span className='font-bold text-[18px]'>-${discountAmount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex flex-col gap-3 border-b py-3">
                    <div className="flex justify-between">
                        <p className='font-semibold'>Shipping</p>
                        <p className='text-grey flex items-center'>
                            <Truck size={16} className="mr-2" /> 
                            Flat Rate: ${shippingCost.toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center py-3 mb-6 font-semibold text-dark">
                    <p>Total</p>
                    <h2 className='text-2xl'>
                        ${totalWithShipping.toFixed(2)}
                    </h2>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
                <h3 className='font-bold text-[16px] mb-5'>Payment Methods</h3>
                <div className="options flex flex-col gap-5">
                    {[
                        { 
                            method: 'Credit Card', 
                            icon: <CreditCard size={24} className="mr-2" />,
                            description: 'Pay securely with credit card' 
                        },
                        { 
                            method: 'PayPal', 
                            icon: <DollarSign size={24} className="mr-2" />,
                            description: 'Quick payment via PayPal' 
                        },
                        { 
                            method: 'Cash on Delivery', 
                            icon: <Truck size={24} className="mr-2" />,
                            description: 'Pay when you receive the package' 
                        }
                    ].map((option) => (
                        <div 
                            key={option.method} 
                            className={`option flex items-center gap-2 p-3 border rounded cursor-pointer 
                                ${paymentMethod === option.method ? 'border-dark bg-gray-100' : ''}`}
                            onClick={() => handlePaymentMethodChange(option.method)}
                        >
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                checked={paymentMethod === option.method}
                                onChange={() => handlePaymentMethodChange(option.method)}
                                className='mr-2'
                            />
                            {option.icon}
                            <div>
                                <p className='font-semibold'>{option.method}</p>
                                <p className='text-grey text-sm'>{option.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Place Order Button */}
            <button 
                onClick={handlePlaceOrder}
                disabled={state.items.length === 0}
                className='w-full bg-black text-white py-3 uppercase font-semibold mt-4 
                    hover:bg-gray-800 transition duration-300
                    disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
                Place Order
            </button>
        </div>
    )
}

export default Order