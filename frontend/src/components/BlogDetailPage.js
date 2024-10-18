import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/BlogContainer.css';
import Navbar from './Navbar';
import Footer from './Footer';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const urlvar = 'https://backend-astro.vercel.app';

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    setSelectedCategory(category);
  }, [location]);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`${urlvar}/api/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${urlvar}/api/blogsfilter?&category=${encodeURIComponent(selectedCategory)}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  const blogDate = new Date(blog.createdAt); 
  const monthYear = blogDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto rounded-lg overflow-hidden pt-16 md:px-10 shadow-lg bg-white">
        <div className="text-gray-500 text-sm px-6 pt-2 italic">
          {monthYear} • Admin
        </div>
        
        <h2 className="font-bold text-4xl text-gray-800 px-6 pt-4 leading-tight">
          {blog.title}
        </h2>
        
        {blog.image && (
          <div className="overflow-hidden mt-4 px-6">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>
        )}
        
        <div className="text-sm my-4 mx-6 inline-block text-gray-600 px-3 py-1 border border-gray-300 rounded-full">
          {blog.category}
        </div>  
        
        <div className="p-6 leading-relaxed text-gray-700 space-y-6">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="prose lg:prose-xl" />
        </div>

        <div className="bg-gray-100 p-8 mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Suggested Blogs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.filter((suggestedBlog) => suggestedBlog._id !== blog._id).slice(0, 2).map((suggestedBlog) => (
              <Link to={`/blog/${suggestedBlog._id}?category=${suggestedBlog.category}`} key={suggestedBlog._id}>
                <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{suggestedBlog.title}</h4>
                  <img 
                    src={suggestedBlog.image} 
                    alt={suggestedBlog.title} 
                    className="w-full h-40 object-cover mb-4 rounded-lg"
                  />
                  <p className="text-gray-600 text-sm mb-2">Category: {suggestedBlog.category}</p>
                  <p className="text-gray-600">{suggestedBlog.content.slice(0, 100)}...</p>
                  <span className="text-blue-600 mt-2 inline-block">Read more &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
