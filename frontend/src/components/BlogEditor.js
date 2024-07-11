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
    <div>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '10px' }} />}
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSave} style={{ marginTop: '10px', padding: '10px' }}>
        Save Blog
      </button>
    </div>
  );
};

export default BlogEditor;