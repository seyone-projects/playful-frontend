import { useState, useEffect } from "react";
import axios from "axios";
import "./CareerForm.css";
import PopupMessage from "../PopupMessage/PopupMessage";
import config from "../../Config";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { GenderGetAll } from "../../service/GenderService";
import { CityGetAll } from "../../service/CityService";
import { SendCareerForm } from "../../service/CareerMailService";

function CareerForm() {
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
  const [whatsappNo, setWhatsappNo] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedGenderId, setSelectedGenderId] = useState("");
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [education, setEducation] = useState("");
  const navigate = useNavigate();

  const fetchGenders = async () => {
    setIsLoading(true);
    try {
      const response = await GenderGetAll(1, 1000, "");
      if (response && Array.isArray(response.genders)) {
        // Filter only active genders
        const activeGenders = response.genders.filter(gender => gender.status === "active");
        setGenders(activeGenders);
      } else {
        setAppError(true);
        setAppErrorMessage('No Genders Found.');
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage('Error loading gender data');
      setAppErrorMode('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const response = await CityGetAll(1, 1000, "");
      if (response && Array.isArray(response.citys)) {
        // Filter only active categories
        const activeCities = response.citys.filter(cat => cat.status === "active");
        setCities(activeCities);
      } else {
        setAppError(true);
        setAppErrorMessage('No City Found.');
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage('Error loading master data');
      setAppErrorMode('Error');
    } finally {
      setIsLoading(false);
    }
  };

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

    if (!selectedCityId) {
      setAppError(true);
      setAppErrorTitle("Error");  
      setAppErrorMessage("Please select a city");
      setAppErrorMode("error");
      return;
    }

    if (!selectedGenderId) {
      setAppError(true);
      setAppErrorTitle("Error");  
      setAppErrorMessage("Please select a gender");
      setAppErrorMode("error");
      return;
    }

    if (!education) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Please enter your education details");
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

    if (!whatsappNo) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Please enter your whatsapp number");
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
     const response = await SendCareerForm(name, selectedGenderId, mobile, email, whatsappNo, selectedCityId, education);

      if (response.status === 200) {
        setAppError(true);
        setAppErrorTitle("Action Response");
        setAppErrorMessage(response.message || "Form submitted successfully!");
        setAppErrorMode("success");
        window.location.href = "/career";
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

  useEffect(() => {
    fetchCities();
    fetchGenders();
  }, []);


  return (
    <div className="">
      <div className="container my-5 single-page-course">
        <h2 className="category-card-title text-center my-4">Careers</h2>
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

                {/* Gender */}
                <div className="form-group col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    className="form-control"
                    value={selectedGenderId}
                    onChange={(e) => setSelectedGenderId(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    {genders.map((gender) => (
                      <option key={gender.id} value={gender.name}>
                        {gender.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
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

                {/* Whatsapp No */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                  <label htmlFor="whatsappNo">Whatsapp No</label>
                  <input
                    type="text"
                    id="whatsappNo"
                    className="form-control"
                    placeholder="Enter your Whatsapp number"
                    value={whatsappNo}
                    onChange={(e) => setWhatsappNo(e.target.value)}
                    required
                  />
                </div>

                {/* City */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    className="form-control"
                    value={selectedCityId}
                    onChange={(e) => setSelectedCityId(e.target.value)}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* eduction details */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                  <label htmlFor="education">Education Details</label>
                  <textarea
                    id="education"
                    className="form-control"
                    placeholder="Enter your education details"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
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

export default CareerForm;
