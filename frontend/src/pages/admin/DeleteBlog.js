import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav';
import { Link } from 'react-router-dom';

const DeleteBlog = () => {

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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${urlvar}/api/blogs/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setBlogs(blogs.filter(blog => blog._id !== id));
                alert('Blog deleted successfully');
            } else {
                alert('Failed to delete the blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('An error occurred while deleting the blog');
        }
    };

    const renderBlogContent = (blog) => {
        const snippet = blog.content.slice(0, 100) + '...';
        return <p dangerouslySetInnerHTML={{ __html: snippet }} />;
    };

    return (
        <div>
            <AdminNav />
            <h1 className="text-3xl font-semibold text-center my-8">Delete Blog</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />}
                        <div className="p-4 flex-grow flex flex-col justify-between">
                            <h2 className="font-bold text-2xl text-gray-800">{blog.title}</h2>
                            <div className="flex-grow">
                                {renderBlogContent(blog)}
                            </div>
                            <button 
                                onClick={() => handleDelete(blog._id)} 
                                className="border-2 bg-red-500 w-32 py-1 rounded-full text-white font-semibold mt-4 self-end"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeleteBlog;