import { useState, useEffect } from "react";
import axios from "axios";
import "./ContactForm.css";
import PopupMessage from "../PopupMessage/PopupMessage";
import config from "../../Config";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { SendContactForm } from "../../service/ContactMailService";

function ContactForm() {
  const {
    isLoading,
    setIsLoading,
    isAppError,
    setAppError,
    appErrorMessage,
    setAppErrorMessage,
    appErrorTitle,
    setAppErrorTitle,
    appErrorMode,
    setAppErrorMode,
    appUser,
  } = useGlobalContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); 
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  
  const sendForm = async (event) => {
    event.preventDefault();

     //required name
    if(!name){
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Name is required");
      setAppErrorMode("error");
      return;
    }

    if (!mobile) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Please enter your mobile number");
      setAppErrorMode("error");
      return;
    }

    if (!email) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Please enter your email address");
      setAppErrorMode("error");
      return;
    }

    // required description
    if (!description) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Please enter your description");
      setAppErrorMode("error");
      return;
    }

    // Validate name
    if (name.length < 3) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Name must be at least 3 characters");
      setAppErrorMode("error");
      return;
    }

    setIsLoading(true);

    try {
     const response = await SendContactForm(name, mobile, email, description);

      if (response.status === 200) {
        setAppError(true);
        setAppErrorTitle("Action Response");
        setAppErrorMessage(response.message || "Form submitted successfully!");
        setAppErrorMode("success");
        window.location.href = "/contact-us";
      } else {
        setAppError(true);
        setAppErrorTitle("Error");
        setAppErrorMessage(response.message || "Action failed. Please try again.");
        setAppErrorMode("error");
      }
    } catch (error) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Something went wrong. Please try again.");
      setAppErrorMode("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="container my-5 single-page-course">
        <h2 className="category-card-title text-center my-4">Contact Us</h2>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <form onSubmit={sendForm} className="register-page">
              <div className="row">
                {/* Full Name */}
                <div className="form-group col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>              

                {/* Mobile */}
                <div className="form-group col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="text"
                    id="mobile"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                  <label htmlFor="password">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                  <button type="submit" className="btn btn-login w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
