import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/BlogContainer.css';

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
    <div className="bg-orange-400 px-4 py-10">
  <h1 className="text-3xl font-semibold text-white text-center pb-5">Blogs</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {blogs.map((blog) => (
      <div key={blog._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <h2 className="font-bold text-2xl text-gray-800 px-4 pt-4">{blog.title}</h2>
        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />}
        <div className="p-4 flex-grow flex flex-col">
          {renderBlogContent(blog)}
          <Link to={`/blog/${blog._id}`} className="text-orange-500 mt-4 font-semibold hover:text-orange-700">Read More</Link>
        </div>
      </div>
    ))}
  </div>
</div>



  );
};

export default BlogDisplayPage;