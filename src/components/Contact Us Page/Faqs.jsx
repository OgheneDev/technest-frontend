import React, { useState } from 'react';

const Faqs = () => {
    const [activeDropdowns, setActiveDropdowns] = useState(["materials", "return", "modify"]);

    const toggleDropdown = (id) => {
        setActiveDropdowns((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const isActive = (id) => activeDropdowns.includes(id);

    return (
        <div className="px-[20px] md:px-[100px] py-[30px] md:py-[60px]">
            <h2 className="text-dark text-xl font-bold mb-7 md:text-3xl">
                Frequently Asked Questions
            </h2>
            <div className="product mb-7">
                <h3 className="text-dark text-[20px] font-bold mb-5">Product</h3>
                <div className="dropdowns flex flex-col gap-5 md:w-[80%] md:ml-auto">
                    <Dropdown
                        id="materials"
                        question="What materials are used in your products?"
                        answer="We use high-quality, sustainable materials such as organic cotton, recycled plastics, and ethically sourced metals to ensure the durability and sustainability of our products."
                        active={isActive("materials")}
                        toggle={toggleDropdown}
                    />
                    <Dropdown
                        id="size"
                        question="How can I find my case size?"
                        answer="Use our case sizing guide available on our website. It provides detailed instructions to measure and select the right size for your device."
                        active={isActive("size")}
                        toggle={toggleDropdown}
                    />
                    <Dropdown
                        id="custom"
                        question="Do you offer customization or personalization services?"
                        answer="Yes, we offer a variety of customization options, including engraved initials, unique designs, and personalized colors. Contact our support team for more details."
                        active={isActive("custom")}
                        toggle={toggleDropdown}
                    />
                </div>
            </div>

            <div className="orders mb-7">
                <h3 className="text-dark text-[20px] font-bold mb-5">Orders</h3>
                <div className="dropdowns flex flex-col gap-5 md:w-[80%] md:ml-auto">
                    <Dropdown
                        id="return"
                        question="What is your return policy?"
                        answer="We offer a 30-day return policy for unused and undamaged products. For more details, please visit our Return Policy page."
                        active={isActive("return")}
                        toggle={toggleDropdown}
                    />
                    <Dropdown
                        id="track"
                        question="How can I track my order?"
                        answer="Once your order is shipped, you will receive a tracking link via email. You can use it to monitor the delivery status in real-time."
                        active={isActive("track")}
                        toggle={toggleDropdown}
                    />
                </div>
            </div>

            <div className="payments">
                <h3 className="text-dark text-[20px] font-bold mb-5">Payments</h3>
                <div className="dropdowns flex flex-col gap-5 md:w-[80%] md:ml-auto">
                    <Dropdown
                        id="modify"
                        question="Can I modify or cancel my order after placing it?"
                        answer="Yes, modifications or cancellations can be made within 24 hours of placing the order. Contact our customer support team for assistance."
                        active={isActive("modify")}
                        toggle={toggleDropdown}
                    />
                    <Dropdown
                        id="questions"
                        question="Still have questions?"
                        answer="Feel free to reach out to our customer support team via email or live chat. We're here to help!"
                        active={isActive("questions")}
                        toggle={toggleDropdown}
                    />
                </div>
            </div>
        </div>
    );
};

const Dropdown = ({ id, question, answer, active, toggle }) => (
    <div className="dropdown">
        <div
            onClick={() => toggle(id)}
            className={`flex justify-between items-center transition-all p-7 font-semibold rounded-[15px] ${
                active ? "bg-[#6610f2] text-white" : "bg-[#f6f6f6] text-dark"
            }`}
        >
            {question}
            <p
                className={`text-[18px] font-bold transform ${
                    active ? "rotate-45" : ""
                } transition-transform duration-300`}
            >
                +
            </p>
        </div>
        {active && (
            <p className="py-5 px-3 text-grey font-semibold">{answer}</p>
        )}
    </div>
);

export default Faqs;
