import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BlogDisplayPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const urlvar = 'http://localhost:5000';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Fetching blogs with:', { searchTerm, selectedCategory });
        const response = await fetch(`${urlvar}/api/blogsfilter?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`);
        const data = await response.json();
        console.log('Blogs fetched:', data);
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
        console.log('Fetching categories...');
        const response = await fetch(`${urlvar}/api/getcategories`);
        const data = await response.json();
        console.log('Categories fetched:', data);
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
      <div className="px-4 py-10">
        <h1 className="text-3xl font-semibold text-center mb-5">All Blogs</h1>
        <div className="mb-5 flex">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="p-2 border rounded-md flex-grow"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border rounded-md ml-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-2" />
              <p className="text-gray-700 mb-2">{blog.content.slice(0, 100)}...</p>
              <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">Read more</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDisplayPage;