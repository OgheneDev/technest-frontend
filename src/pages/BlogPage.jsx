import React from 'react'
import BlogBanner from '../components/Blog/BlogBanner'
import { LatestPostsProvider } from '../context/LatestPostContext'
import LatestPosts from '../components/LandingPage/LatestPosts'
import ContactCards from '../components/About Us/ContactCards'

const BlogPage = () => {
  return (
    <div>
      <BlogBanner />
      <LatestPostsProvider>
        <LatestPosts />
      </LatestPostsProvider>
      <ContactCards />
    </div>
  )
}

export default BlogPage
