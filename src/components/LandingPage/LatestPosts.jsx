import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLatestPosts } from '../../context/LatestPostContext';
import { User } from 'lucide-react';

const SkeletonPost = () => (
  <div className="animate-pulse flex flex-col gap-[15px] items-start w-full md:w-[280px]">
    <div className="bg-gray-300 rounded-[10px] mb-[10px] h-[170px] w-full"></div>
    <div className="bg-gray-300 py-[5px] px-[20px] rounded-full w-1/3"></div>
    <div className="bg-gray-300 h-[20px] w-2/3 rounded-md"></div>
    <div className="bg-gray-300 h-[15px] w-full rounded-md"></div>
    <div className="user flex gap-[10px] items-center">
      <div className="profile bg-gray-300 p-[5px] rounded-full h-[35px] w-[35px]"></div>
      <div className="bg-gray-300 h-[15px] w-[80px] rounded-md"></div>
    </div>
  </div>
);

const LatestPosts = () => {
  const { posts, fetchPosts, loading } = useLatestPosts();

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible" // Use animate instead of whileInView for consistent behavior
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
        {loading ? (
          // Show 4 skeletons while loading
          Array(4)
            .fill()
            .map((_, index) => <SkeletonPost key={index} />)
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible" // Ensure individual posts animate to visible
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-auto md:mb-0 cursor-pointer"
            >
              <motion.img
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
          <motion.p variants={itemVariants} className="text-center">
            No posts found.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default LatestPosts;
