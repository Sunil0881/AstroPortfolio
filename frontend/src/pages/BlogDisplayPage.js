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
    <div>
    {blogs.map((blog) => (
      <div key={blog._id} className="blog-container">
        <h2>{blog.title}</h2>
        {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
        {renderBlogContent(blog)}
        <Link to={`/blog/${blog._id}`} className="read-more-button">Read More</Link>
      </div>
    ))}
  </div>


  );
};

export default BlogDisplayPage;