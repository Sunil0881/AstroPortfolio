import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/BlogContainer.css';
import Navbar from '../components/Navbar';

const BlogDisplayPage = () => {
  const [blogs, setBlogs] = useState([]);
  const urlvar = 'https://backend-astro.vercel.app';

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${urlvar}/api/blogs`);
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const renderBlogContent = (blog) => {
    const snippet = blog.content.slice(0, 100) + '...';
    return <p dangerouslySetInnerHTML={{ __html: snippet }} />;
  };

  return (
    <div>
      <Navbar />
    <div className=" px-4 py-10">
  <h1 className="text-3xl font-semibold text-black text-center pb-5">Blogs</h1>
  <p className=',x-3 text-center pb-4 md:mx-24 lg:mx-96'>Welcome to the Astrologer Blog, your go-to resource for insightful articles, tips, and updates on everything related to astrology</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
    {blogs.map((blog) => (
      <div key={blog._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ">
        
        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />}
        <h2 className="font-bold text-2xl text-gray-800 px-4 pt-4">{blog.title}</h2>
        <div className="p-4 flex-grow flex flex-col">
          {renderBlogContent(blog)}
          <button className='border-2 bg-orange-500 w-32 py-1 rounded-full mt-5 ' >
          <Link to={`/blog/${blog._id}`} className="text-white mt-4 font-semibold ">Read More</Link>
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
</div>



  );
};

export default BlogDisplayPage;