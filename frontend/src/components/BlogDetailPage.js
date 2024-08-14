import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/BlogContainer.css';

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
        console.log('Fetching blogs with:', { selectedCategory });
        const response = await fetch(`${urlvar}/api/blogsfilter?&category=${encodeURIComponent(selectedCategory)}`);
        const data = await response.json();
        console.log('Blogs fetched:', data);
        setBlogs(data);
        
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="bg-[#FFB02E]  px-4 md:px-12 py-10 min-h-screen">
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
    <h2 className="font-bold text-3xl text-gray-800 px-4 pt-6">{blog.title}</h2>
    {blog.image && (
      <div className="h-96 overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="text-sm w-fit my-5 mx-5 text-center text-gray-600 p-1 border-2 border-gray-600 rounded-xl">
      {blog.category}
    </div>
    <div className="p-6">
      <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-gray-700" />
    </div>

    <div>
      <div>
        Suggested Blogs
      </div>
      <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.filter((suggestedBlog) => suggestedBlog._id !== blog._id).slice(0, 2).map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-2" />
              <p>category: {blog.category}</p>
              <p className="text-gray-700 mb-2">{blog.content.slice(0, 100)}...</p>
              <Link to={`/blog/${blog._id}?category=${blog.category}`} className="text-blue-500 hover:underline">Read more</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default BlogDetailPage;