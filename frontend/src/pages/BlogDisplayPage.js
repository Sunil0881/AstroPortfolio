import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BlogDisplayPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const urlvar = 'https://backend-astro.vercel.app';

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    setSelectedCategory(category);
  }, [location]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${urlvar}/api/blogsfilter?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${urlvar}/api/getcategories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 py-10 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Blogs</h1>
        <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="p-3 w-full md:w-2/3 border rounded-md flex-grow shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-3 border rounded-md w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 flex flex-col h-full">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h2>
              <p className="text-sm text-amber-600 mb-2">Category: {blog.category}</p>
              <div
                dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) }}
                className="text-gray-700 text-base line-clamp-3 mb-4 flex-grow"
              />
              <div className="mt-auto">
                <Link to={`/blog/${blog._id}?category=${blog.category}`}>
                  <button className="text-white bg-amber-500 py-2 px-4 rounded-full hover:bg-amber-600 transition-transform transform hover:scale-105">
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDisplayPage;
