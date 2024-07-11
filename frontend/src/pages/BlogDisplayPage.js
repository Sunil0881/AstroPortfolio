import React, { useEffect, useState } from 'react';

const BlogDisplayPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const urlvar = 'http://localhost:5000';

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${urlvar}/api/blogs`);
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleReadMore = (id) => {
    setExpandedBlogId(id);
  };

  const renderBlogContent = (blog) => {
    if (expandedBlogId === blog._id) {
      return <div dangerouslySetInnerHTML={{ __html: blog.content }} />;
    } else {
      // Display only a snippet of the content
      const snippet = blog.content.slice(0, 100) + '...';
      return <p dangerouslySetInnerHTML={{ __html: snippet }} />;
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{blog.title}</h2>
          {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto' }} />}
          {renderBlogContent(blog)}
          {expandedBlogId !== blog._id && (
            <button onClick={() => handleReadMore(blog._id)}>Read More</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogDisplayPage;