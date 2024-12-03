import React, { useEffect } from 'react';
import { useLatestPosts } from '../../context/LatestPostContext';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const LatestPosts = () => {
  const { posts, fetchPosts } = useLatestPosts();

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  return (
    <div className="px-[20px] md:px-[100px] pb-[50px]">
      <h2 className="font-bold text-xl mb-[20px] text-grey-dark md:text-3xl">
        Latest Posts
      </h2>

      <div className="posts flex flex-col md:flex-row gap-[30px]">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="w-full md:w-auto  md:mb-0" // Full width on mobile, auto on desktop
            >
              <img
                src={post.images[0]}
                alt={post.name}
                className="rounded-[10px] mb-[10px] h-[170px] w-full"
              />
              <div className="text-content flex flex-col gap-[15px] items-start">
                <span className="text-white bg-dark py-[5px] px-[20px] rounded-full uppercase text-[11px]">
                  {post.category}
                </span>
                <h2 className="dark text-xl font-semibold">{post.name}</h2>
                <p className="text-[14px] text-[#9d9fa3]">{post.description}</p>
                <Link to="" className="text-blue-800 underline text-[15px]">
                  Continue Reading
                </Link>
                <div className="user flex gap-[10px] items-center">
                  <div className="profile bg-[#bec1c5] p-[5px] rounded-full">
                    <User className="text-white" size={25} />
                  </div>
                  <span className="text-dark font-semibold">{post.user}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default LatestPosts;
