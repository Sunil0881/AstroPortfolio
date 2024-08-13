import React from 'react';
import BlogEditor from '../../components/BlogEditor';
import AdminNav from '../../components/AdminNav'

const BlogUploadPage = () => {
  const urlvar = 'https://backend-astro.vercel.app';

  const handleSaveBlog = async (blog) => {
    try {
      const response = await fetch(`${urlvar}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log('Blog saved successfully:', data);
        alert("Blog successfully Posted!!!");
      } else {
        alert('Failed to save the blog. Please try again.');
      }
    } catch (error) {
      console.error('Error saving the blog:', error);
      alert('Error saving the blog. Please try again.');
    }
  };

  return (
    <div>
      <AdminNav />
      <BlogEditor onSave={handleSaveBlog} />
    </div>
  );
};

export default BlogUploadPage;