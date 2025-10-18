import { useState } from 'react';
import {Link , useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import './ForgotPasswordPage.css';  
import loginImage from '../../assets/images/login-img.png'; 
import logo from '../../assets/images/logo.png';  
import config from '../../Config';
import PopupMessage from '../../Components/PopupMessage/PopupMessage';  

function ForgotPasswordPage() {
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState('');  
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setMessage('Please enter your email address.');
      setShowPopup(true);
      return;
    }
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      setShowPopup(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email); // Send 'email'

      const response = await axios.post(`${config.apiUrl}/forgot-password-email.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === 200) {
        setMessage(response.data.message);
        setShowPopup(true);
        navigate('/login'); // Navigate to login page after success
      } else {
        setMessage(response.data.message || "Error processing request.");
        setShowPopup(true);
      }
    } catch (error) {
      setMessage('Response: ' + (error.response?.data?.message || error.message));
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Column - Hidden on mobile */}
        <div className="col-12 col-md-6 left-column d-none d-md-flex flex-column justify-content-center align-items-center p-3 left-forgot">
          <img src={loginImage} alt="Welcome" className="img-fluid mb-3 w-50" />
          <h2 className="text-center">Welcome to Dreams <br />LMS Courses.</h2>
          <p className="text-center">
            Lorem ipsum dolor sit aimer, consectetur advising elite, </p>
        </div>
  
        {/* Right Column */}
        <div className="col-12 col-md-6 right-column d-flex flex-column justify-content-center p-5">
          <div className="d-flex justify-content-between align-items-center mb-4 w-100 px-3">
          <Link to="/" className="logo wizard-logo">
                <img
                  src={logo}
                  alt="PLAYFUL PENCILS LMS"
                  className="logo-img"
                />
                <div className="logoText">PLAYFUL PENCILS</div>
              </Link>
            <a href="/" className="alink back-to-home text-black create-txt">Back to Home</a>
          </div>
          <h3 className='mb-3 text-center my-5 mb-5'>Forgot Password?</h3>
          <form onSubmit={handleForgotPassword}>  
            <div>
              <label htmlFor="email" className='fw-semibold'>Email</label>
              <input
                type="email"
                id="email"
                className="form-control w-100 mt-2 mb-3"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <button type="submit" className="btn btn-login mt-3 py-2">Submit</button>
          </form>
        </div>
      </div>
  
      {/* Popup for messages */}
      {showPopup && (
        <PopupMessage message={message} onClose={closePopup} />
      )}
    </div>
  );
  
  
}

export default ForgotPasswordPage;