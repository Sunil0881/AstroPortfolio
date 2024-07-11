import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/admin/Login';
import Admin from './pages/admin/Admin';
import ContactForm from './components/Contactform';
import Thankyou from './pages/Thankyou';
import BlogUploadPage from './pages/BlogUploadPage';
import BlogDisplayPage from './pages/BlogDisplayPage';
import BlogDetailPage from './components/BlogDetailPage';



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
              <Route path='/adminpage' element={isLoggedIn === 'true'? <Admin />:<Login />} />
              <Route path='/contactform' element={ <ContactForm />} />
              <Route path="/thankyou" element={<Thankyou />} />
              <Route path="/upload" element={<BlogUploadPage />} />
              <Route path="/display" element={<BlogDisplayPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
            </Routes>
          </Router>
    
    </div>
  );
}

export default App;
