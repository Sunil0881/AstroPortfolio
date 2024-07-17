import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSave = () => {
    onSave({ title, content, image });
    setTitle('');
    setContent('');
    setImage('');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='bg-orange-400 h-screen'>
    <div className='px-4 md:px-6 lg:px-10 pt-20  bg-orange-400  '>
      <h1 className='text-2xl md:text-4xl font-semibold text-center pb-10 text-white'>Upload Your Blog Here</h1>
    <div className='bg-white rounded-3xl '>
      <div className='flex justify-center pt-3 pb-3'>
      <input className='text-center '
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />
      </div>
      <div className='px-3 pb-3 lg:px-7'>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      </div>
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '10px' }} />}
      <div className='px-3 lg:px-7'>
      <ReactQuill value={content} onChange={setContent} />
      </div>
      <div className='flex justify-center pt-10 pb-5'>
      <button className=" bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300" onClick={handleSave} style={{ marginTop: '10px', padding: '10px' }}>
        Save Blog
      </button></div>
    </div>
    </div>
    </div>
  );
};

export default BlogEditor;