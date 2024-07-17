import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BlogContainer.css';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const urlvar = 'https://backend-astro.vercel.app';

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
    <div className="bg-orange-400 px-4 py-10 min-h-screen">
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
    <h2 className="font-bold text-3xl text-gray-800 px-4 pt-6">{blog.title}</h2>
    {blog.image && (
      <div className="h-96 overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-6">
      <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-gray-700" />
    </div>
  </div>
</div>

  );
};

export default BlogDetailPage;