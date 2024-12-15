import React, { useState } from 'react';
import { MessageCircleQuestion } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      Swal.fire({
        title: "Warning!",
        text: `Please fill in all fields before submitting.`,
        icon: "warning"
      });
      return;
    }

    setLoading(true); // Start loading state

    const serviceId = 'service_q89cnsr'; // Replace with your EmailJS service ID
    const templateId = 'template_4wmr5pw'; // Replace with your EmailJS template ID
    const userId = 'd-Ir5APRYvIMx9yz9'; // Replace with your EmailJS user ID

    // Compose a comprehensive message with all form fields
    const emailMessage = `

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;

    const templateParams = {
      message: emailMessage
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success"
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        }); // Clear the form
      })
      .catch((error) => {
        console.error('FAILED...', error);
        Swal.fire({
          title: "Failed!",
          text: "Failed to send your message. Please try again later.!",
          icon: "error"
        });
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-[#6610f2] p-5 md:px-[40px] md:pt-[40px] md:pb-[100px] rounded-[15px] w-[90%] mx-auto'
    >
      <div className="flex gap-5 items-center mb-10 md:mb-[55px]">
        <MessageCircleQuestion size={80} className='text-white' />
        <article>
          <h1 className='text-white mb-2 text-xl md:text-3xl md:font-bold'>Need Any Help?</h1>
          <p className='text-white text-[12px] md:text-[18px]'>We are here to help you with any questions.</p>
        </article>
      </div>

      <div className="inputs flex flex-col gap-5 mb-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
          className='px-5 py-5 rounded-[5px] focus:outline-none'
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          className='px-5 py-5 rounded-[5px] focus:outline-none'
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone'
          className='px-5 py-5 rounded-[5px] focus:outline-none'
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder='Message'
          className='px-5 pb-[120px] pt-5 rounded-[5px] focus:outline-none'
          required
        />
      </div>

      <button
        type="submit"
        className='bg-black text-white py-2 md:py-4 md:px-[60px] px-8 rounded-full flex items-center justify-center gap-2'
        disabled={loading}
      >
        {loading ? (
          <span className="spinner border-white border-[3px] border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default ContactUsForm;