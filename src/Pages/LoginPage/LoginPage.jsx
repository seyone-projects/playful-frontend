import { useState } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";  
import "./LoginPage.css"; 
import loginImage from "../../assets/images/login-img.png"; 
import logo from "../../assets/images/logo.png";  
import config from "../../Config"; 
import { Link } from "react-router-dom";
import PopupMessage from "../../Components/PopupMessage/PopupMessage";  

function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!mobile) {
      setMessage("Mobile number is required.");
      setShowPopup(true);
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      // Check if mobile number is 10 digits
      setMessage("Please enter a valid 10-digit mobile number.");
      setShowPopup(true);
      return;
    }
    if (!password) {
      setMessage("Password is required.");
      setShowPopup(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("mobile", mobile);
      formData.append("password", password);

      const response = await axios.post(
        `${config.apiUrl}/login-validate.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        const userId = response.data.data.id; 
        setMessage(response.data.message);
        localStorage.setItem("userid", userId);
        navigate("/home");
      } else {
        setMessage(response.data.message || "Error logging in.");
        setShowPopup(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container-fluid login-container">
      <div className="row">
        {/* Left Column - Hidden on small screens, shown on large screens */}
        <div className="col-12 col-lg-6 d-none d-lg-flex justify-content-center align-items-center text-center text-lg-left left-side-col">
          <div>
            <img
              src={loginImage}
              alt="Welcome"
              className="img-fluid w-50 mb-4"
            />
            <h2 className="mb-2">
              Welcome to Dreams <br />
              LMS Courses.
            </h2>
            <p className="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Right Column - Takes full width on mobile */}
        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-3 right-column">
          <div className="w-100 px-4 pt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/" className="logo wizard-logo">
                <img
                  src={logo}
                  alt="PLAYFUL PENCILS LMS"
                  className="logo-img"
                />
                <div className="logoText">PLAYFUL PENCILS</div>
              </Link>
              <Link to="/" className="alink back-to-home text-black create-txt">
                Back to Home
              </Link>
            </div>

            <h3 className="text-center mb-4">Sign into Your Account</h3>

            <form onSubmit={handleLogin} className="login-page">
              <div className="form-group mb-3">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  aria-describedby="mobileHelp"
                />
                <small id="mobileHelp" className="form-text text-muted">
                  Please enter your mobile number for authentication.
                </small>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="passwordHelp"
                />
                <small id="passwordHelp" className="form-text text-muted">
                  Your password must be at least 8 characters long.
                </small>
              </div>

              <button type="submit" className="btn btn-login mt-2">
                Sign In
              </button>

              <div className="d-flex justify-content-between mt-3 checkbox-group">
                <Link to="/forgotpassword" className="text-muted alink create-txt">
                  Forgot Password?
                </Link>
              </div>
            </form>

            <p className="text-center mt-4">
              New User?{" "}
              <Link to="/register" className="alink create-txt">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Popup for messages */}
      {showPopup && (
        <div className="popup-wrapper" role="alert" aria-live="assertive">
          <PopupMessage message={message} onClose={closePopup} />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
