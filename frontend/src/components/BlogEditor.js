import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebase';

const MAX_IMAGE_SIZE_MB = 2;

const BlogEditor = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState([]);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://backend-astro.vercel.app/api/getcategories');
      const data = await response.json();
      setCategories(data);
      setSuggestedCategories(data); // Initially, show all categories
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file && file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setError('File size exceeds 2MB.');
      setImage(null);
    } else {
      setImage(file);
      setError('');
      handleImageUpload(file);
    }
  };

  const handleSave = () => {
    if (!error && !uploading) {
      onSave({
        title,
        content,
        image: imageURL,
        category: isAddingNewCategory ? categoryInput : categoryInput
      });
      setTitle('');
      setContent('');
      setImage(null);
      setImageURL('');
      setCategoryInput('');
      setSuggestedCategories(categories);
      setIsAddingNewCategory(false);
    }
  };

  const handleImageUpload = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (err) => {
        setError('Error while uploading.');
        setImage(null);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageURL(downloadURL);
          setError('');
          setUploading(false);
        } catch (err) {
          setError('Error retrieving the image URL.');
          setUploading(false);
        }
      }
    );
  };

  const handleCategoryInputChange = (e) => {
    const input = e.target.value;
    setCategoryInput(input);

    if (input) {
      const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestedCategories(filteredCategories);
      setShowSuggestions(true);
      setIsAddingNewCategory(!categories.some(cat => cat.name.toLowerCase() === input.toLowerCase()));
    } else {
      setSuggestedCategories(categories);
      setShowSuggestions(false); // Hide suggestions if input is empty
      setIsAddingNewCategory(false);
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategoryInput(selectedCategory.name); // Update the input field with the selected category name
    setShowSuggestions(false);
    setIsAddingNewCategory(false);
  };

  const handleAddNewCategory = async () => {
    if (categoryInput && !categories.some(cat => cat.name.toLowerCase() === categoryInput.toLowerCase())) {
      await fetch('https://backend-astro.vercel.app/api/add-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: categoryInput })
      });

      const newCategories = [...categories, { name: categoryInput }];
      setCategories(newCategories);
      setSuggestedCategories(newCategories);
      alert("Category successfully added!");
      setCategoryInput('');
      setIsAddingNewCategory(false);
      setShowSuggestions(false);
    }
  };

  const handleCategoryKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isAddingNewCategory) {
        handleAddNewCategory();
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleCategoryFocus = () => {
    setSuggestedCategories(categories);
    setShowSuggestions(true);
  };

  const handleCategoryBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // Delay to allow click events on suggestions
  };

  return (
    <div>
      <div className='px-4 md:px-6 lg:px-72 pt-20'>
        <h1 className='text-2xl md:text-4xl font-semibold text-center pb-10'>Upload Your Blog Here</h1>
        <div className='bg-white rounded-3xl shadow-2xl shadow-slate-500'>
          <div className='flex justify-center pt-3 pb-3'>
            <input
              className='text-center'
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
            />
          </div>
          <div className='px-3 lg:px-7'>
            <input
              type="text"
              placeholder="Enter category"
              value={categoryInput}
              onChange={handleCategoryInputChange}
              onKeyPress={handleCategoryKeyPress}
              onFocus={handleCategoryFocus}
              onBlur={handleCategoryBlur}
              className='w-full p-2 border rounded-md'
            />
            {showSuggestions && suggestedCategories.length > 0 && (
              <ul className='border rounded-md mt-1'>
                {suggestedCategories.map((cat, index) => (
                  <li
                    key={index}
                    className='p-2 cursor-pointer hover:bg-gray-200'
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='px-3 pb-3 lg:px-7'>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            {uploading && (
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                    {uploadProgress}%
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="flex-1 flex-grow bg-teal-200 rounded-full">
                      <div
                        className="bg-teal-500 text-xs leading-none py-1 text-center text-white rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {imageURL && <img src={imageURL} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '10px' }} />}
          <div className='px-3 lg:px-7'>
            <ReactQuill value={content} onChange={setContent} />
          </div>
          {!uploading && (
            <div className='flex justify-center pt-10 pb-5'>
              <button
                className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;