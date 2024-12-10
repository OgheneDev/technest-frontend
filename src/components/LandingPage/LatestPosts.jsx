import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLatestPosts } from '../../context/LatestPostContext';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const LatestPosts = () => {
  const { posts, fetchPosts } = useLatestPosts();

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  // Variants for section and item animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="px-[20px] md:px-[100px] py-[50px] pb-20"
    >
      <motion.h2 
        variants={itemVariants}
        className="font-bold text-xl mb-[20px] text-grey-dark md:text-3xl"
      >
        Latest Posts
      </motion.h2>

      <div className="posts flex flex-col md:flex-row gap-[30px]">
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-auto md:mb-0 cursor-pointer"
            >
              <motion.img
                variants={itemVariants}
                src={post.images[0]}
                alt={post.name}
                className="rounded-[10px] mb-[10px] h-[170px] w-full"
              />
              <div className="text-content flex flex-col gap-[15px] items-start">
                <motion.span 
                  variants={itemVariants}
                  className="text-white bg-dark py-[5px] px-[20px] rounded-full uppercase text-[11px]"
                >
                  {post.category}
                </motion.span>
                <motion.h2 
                  variants={itemVariants}
                  className="dark text-xl font-semibold"
                >
                  {post.name}
                </motion.h2>
                <motion.p 
                  variants={itemVariants}
                  className="text-[14px] text-[#9d9fa3]"
                >
                  {post.description}
                </motion.p>
                <motion.div 
                  variants={itemVariants}
                  className="user flex gap-[10px] items-center"
                >
                  <motion.div 
                    variants={itemVariants}
                    className="profile bg-[#bec1c5] p-[5px] rounded-full"
                  >
                    <User className="text-white" size={25} />
                  </motion.div>
                  <motion.span 
                    variants={itemVariants}
                    className="text-dark font-semibold"
                  >
                    {post.user}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p variants={itemVariants}>No posts found.</motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default LatestPosts;