import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/BlogContainer.css';
import Navbar from "./Navbar"
import Footer from "../components/Footer"

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

  // Scroll to the top of the page when the blog ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  const blogDate = new Date(blog.createdAt); // or blog.publishedAt
  const monthYear = blogDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto rounded-lg overflow-hidden flex flex-col pt-16 md:px-10">
        <div className="text-sm text-black px-4 pt-2">
          {monthYear}, by Admin
        </div>
        
        <h2 className="font-bold text-3xl text-gray-800 px-4 pt-2">{blog.title}</h2>
        
        {blog.image && (
          <div className="overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full p-2 h-48 md:h-full lg:h-full object-cover" />
          </div>
        )}
        
        <div className="text-sm w-fit my-5 mx-5 text-center text-gray-600 px-3 py-1 border-2 border-gray-600 rounded-2xl">
          {blog.category}
        </div>  
        
        <div className="p-6">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-gray-700" />
        </div>

        <div>
          <div className='text-2xl md:text-3xl pl-5 font-semibold pt-20 md:pt-40'>
            Suggested Blogs
          </div>
          <div className='pt-5'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-20 gap-4 px-4 md:px-0 lg:px-40">
              {blogs.filter((suggestedBlog) => suggestedBlog._id !== blog._id).slice(0, 2).map((blog) => (
                <Link to={`/blog/${blog._id}?category=${blog.category}`} key={blog._id}>
                  <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-2" />
                    <p>category: {blog.category}</p>
                    <p className="text-gray-700 mb-2">{blog.content.slice(0, 100)}...</p>
                    <p className="text-blue-500 hover:underline">Read more</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
