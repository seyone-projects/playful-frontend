import { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterPage.css";
import PopupMessage from "../../Components/PopupMessage/PopupMessage";
import loginImage from "../../assets/images/login-img.png";
import logo from "../../assets/images/logo.png";
import config from "../../Config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedGenderId, setSelectedGenderId] = useState("");
  const [message, setMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
    fetchGenders();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/city-get-all.php?status=active&keyword=&page=0&pagesize=500`
      );
      if (response.status === 200) {
        setCities(response.data.data);
      } else {
        setMessage("Error fetching cities.");
      }
    } catch {
      setMessage("Cannot connect to server...");
    }
  };

  const fetchGenders = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/gender-get-all.php?status=active&keyword=&page=1&pagesize=500`
      );
      if (response.status === 200) {
        setGenders(response.data.data);
      } else {
        setMessage("Error fetching genders.");
      }
    } catch {
      setMessage("Cannot connect to server...");
    }
  };

  const validateName = (name) => /^[A-Za-z\s']{3,}$/.test(name);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handlePopupClose = () => setMessage(""); // Close the popup6
  const addUser = async (e) => {
    e.preventDefault();

    if (!name) {
      setMessage(
        <span>
          Name is required.
          <br />
          ex: Ragav
        </span>
      );
      return;
    }

    if (!validateName(name)) {
      setMessage(
        "Name must be at least 3 characters long and contain no special characters."
      );
      return;
    }
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!validateMobile(mobile)) {
      setMessage("Mobile number must be exactly 10 digits.");
      return;
    }
    if (!password) {
      setMessage("Password is required.");
      return;
    }
    if (!selectedCityId) {
      setMessage("Please select a city.");
      return;
    }
    if (!selectedGenderId) {
      setMessage("Please select a gender.");
      return;
    }

    setMessage("Uploading data...");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("whatsappNo", whatsappNo);
      formData.append("password", password);
      formData.append("status", "active");
      formData.append("cityId", selectedCityId);
      formData.append("genderId", selectedGenderId);

      console.log("Form Data:", Object.fromEntries(formData)); // Debugging log

      const response = await axios.post(
        `${config.apiUrl}/user-add.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        setName("");
        setEmail("");
        setMobile("");
        setWhatsappNo("");
        setPassword("");
        setSelectedCityId("");
        setSelectedGenderId("");
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/"); // Redirect to login page
        }, 1000);
        // Optionally redirect to another page or reset form
      } else {
        setMessage("Error in registration.");
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data?.message || error.message
      );
      setMessage(
        "Response: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="container-fluid d-flex">
      <PopupMessage message={message} onClose={handlePopupClose} />{" "}
      {/* Popup Component */}
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
        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-3 right-side">
          <div className="w-100 px-4 pt-3">
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

            {/* Form */}
            <form onSubmit={addUser} className="register-page">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control mx-auto"
                  placeholder="Enter your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  className="form-control mx-auto"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="whatsappNo">Whatsapp No</label>
                <input
                  type="text"
                  id="whatsappNo"
                  className="form-control mx-auto"
                  placeholder="Enter your Whatsapp number"
                  value={whatsappNo}
                  onChange={(e) => setWhatsappNo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control mx-auto"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control mx-auto"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  className="form-control mx-auto"
                  value={selectedGenderId}
                  onChange={(e) => setSelectedGenderId(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  className="form-control mx-auto"
                  value={selectedCityId}
                  onChange={(e) => setSelectedCityId(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-login mt-2">
                Register
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <a href="/login" className="alink text-center create-txt">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
