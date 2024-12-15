import React from 'react'
import HelpCard from './Contact Cards/HelpCard'
import ContactDetailsCard from './Contact Cards/ContactDetailsCard'
import { motion } from 'framer-motion';

const ContactCards = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-12 px-4 md:px-[100px] grid md:grid-cols-2 gap-6"
    >
      <HelpCard />
      <ContactDetailsCard />
    </motion.section>
  );
};

export default ContactCards;
