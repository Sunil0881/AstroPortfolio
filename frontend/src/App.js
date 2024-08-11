import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/admin/Login';
import Addslot from './pages/admin/Addslot';
import ContactForm from './components/Contactform';
import Thankyou from './pages/Thankyou';
import BlogUploadPage from './pages/admin/BlogUploadPage';
import BlogDisplayPage from './pages/BlogDisplayPage';
import BlogDetailPage from './components/BlogDetailPage';
import DeleteBlog from './pages/admin/DeleteBlog';




function App() {
  const isLoggedIn = localStorage.getItem('authenticated');
  return (
    <div>
         <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path='/login'  element={<Login />} />
              <Route path='/admin' element={isLoggedIn === 'true'? <Addslot />:<Login />} />
              <Route path='/addslot' element={isLoggedIn === 'true'? <Addslot />:<Login />} />
              <Route path='/contactform' element={ <ContactForm />} />
              <Route path="/thankyou" element={<Thankyou />} />
              <Route path="/upload" element={isLoggedIn === 'true'? <BlogUploadPage />:<Login />} />
              <Route path="/display" element={<BlogDisplayPage />} />
              <Route path="/deleteblog" element={<DeleteBlog />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
            </Routes>
          </Router>
    
    </div>
  );
}

export default App;
