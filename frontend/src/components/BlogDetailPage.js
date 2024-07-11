import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BlogContainer.css';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const urlvar = 'http://localhost:5000';

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`${urlvar}/api/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-container">
      <h2>{blog.title}</h2>
      {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogDetailPage;