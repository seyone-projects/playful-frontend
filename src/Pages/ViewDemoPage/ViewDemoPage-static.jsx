import { useState } from "react";
import { Link } from "react-router-dom";
import book_demo from "../../assets/Images/demo_img.jpg";
import logo from "../../assets/Images/logo.png";
import user1 from "../../assets/Images/user2.jpg";
import user2 from "../../assets/Images/user6.jpg";
import user3 from "../../assets/Images/user7.jpg";
import "./ViewDemoPage.css";

const ViewDemoPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    preferredlanguage: "",
    courseType: "",
    standard: "",
    board: "",
    subject: "",
    currentPosition: "",
    city: "",
    selectedDate: "",
    selectedTime: "",
  });

  const instructors = [
    {
      id: 1,
      name: "John Doe",
      description: "Expert in JavaScript and React",
      image: user1,
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "Specialist in Python and AI",
      image: user2,
    },
    {
      id: 3,
      name: "Alice Johnson",
      description: "Frontend Development",
      image: user3,
    },
  ];

  const timingSlots = [
    { start: "9:00 AM", end: "9:30 AM" },
    { start: "9:30 AM", end: "10:00 AM" },
    { start: "10:00 AM", end: "10:30 AM" },
    { start: "10:30 AM", end: "11:00 AM" },
    { start: "11:00 AM", end: "11:30 AM" },
    { start: "11:30 AM", end: "12:00 PM" },
    { start: "12:00 PM", end: "12:30 PM" },
    { start: "12:30 PM", end: "1:00 PM" },
    { start: "1:00 PM", end: "1:30 PM" },
    { start: "1:30 PM", end: "2:00 PM" },
    { start: "2:00 PM", end: "2:30 PM" },
    { start: "2:30 PM", end: "3:00 PM" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimingSelection = (time) => {
    setFormData((prev) => ({
      ...prev,
      selectedTime: time,
    }));
  };

  const handleCourseTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      courseType: type,
    }));
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [selectedInstructors, setSelectedInstructors] = useState([]);

  const handleInstructorSelection = (id) => {
    if (selectedInstructors.includes(id)) {
      setSelectedInstructors(
        selectedInstructors.filter((instructorId) => instructorId !== id)
      );
    } else if (selectedInstructors.length < 3) {
      setSelectedInstructors([...selectedInstructors, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side - Image Column */}
        <div className="col-12 col-lg-4 d-none d-lg-flex justify-content-center p-0 align-items-center text-center">
          <img src={book_demo} alt="LMS Demo" className="img-fluid book-img" />
        </div>

        {/* Right Side - Form Column */}
        <div className="col-12 col-lg-8 h-100">
          {/* Header Title */}
          <div className="header-title">
            <div className="">
              <Link to="/" className="logo wizard-logo">
                <img
                  src={logo}
                  alt="PLAYFUL PENCILS LMS"
                  className="logo-img"
                />
                <div className="logoText">PLAYFUL PENCILS</div>
              </Link>
              <h2 className="text-center mb-3 fw-bold mx-auto">Book a Demo</h2>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="wizard-form">
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="row g-3">
                <h4 className="text-center">Enter Your Basic Information</h4>
                <div className="col-12 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your Whatsapp number"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="preferredlanguage"
                    value={formData.preferredlanguage}
                    onChange={handleInputChange}
                    required
                  >
                    <option className="" value="">
                      Choose Preferred Language
                    </option>
                    <option className="" value="Tamil">
                      Tamil
                    </option>
                    <option className="" value="Malayalam">
                      Malayalam
                    </option>
                    <option className="" value="Kannada">
                      Kannada
                    </option>
                    <option className="" value="Telugu">
                      Telugu
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="row g-3">
                <h4 className="text-center">Select Course Type</h4>
                <div className=" mb-4">
                  <div className="row d-flex justify-content-center gap-2 mt-md-3">
                    <div
                      className="course-image-container d-flex col-md-6 col-12 mb-2 mb-md-0"
                      onClick={() => {
                        handleCourseTypeSelect("professional");
                        goToNextStep();
                      }}
                    >
                      <img
                        src={user1}
                        alt="Professional Course"
                        className="img-fluid course-image"
                      />
                      <div className="course-overlay text-center align-content-center w-50">
                        <p>Professional Course</p>
                      </div>
                    </div>

                    <div
                      className="course-image-container d-flex col-md-6 col-12 mb-2 mb-md-0"
                      onClick={() => {
                        handleCourseTypeSelect("academic");
                        goToNextStep();
                      }}
                    >
                      <img
                        src={user3}
                        alt="Academic Course"
                        className="img-fluid course-image"
                      />
                      <div className="course-overlay text-center align-content-center w-50">
                        <p>Academic Course</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="row g-3 mb-5">
                <h4 className="text-center">Course Details</h4>
                {/* Show Standard and Board fields if courseType is academic */}
                {formData.courseType === "academic" && (
                  <>
                    <div className="col-12 col-md-6">
                      <select
                        className="form-select"
                        style={{ padding: "0.8rem" }}
                        name="standard"
                        value={formData.standard}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select your standard</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <select
                        className="form-select"
                        style={{ padding: "0.8rem" }}
                        name="board"
                        value={formData.board}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Board</option>
                        <option value="state">State</option>
                        <option value="central">Central</option>
                        <option value="international">International</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Always show Subject and Position fields */}
                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="tamil">Tamil</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                    <option value="socialScience">Social Science</option>
                  </select>
                </div>

                {formData.courseType === "professional" && (
                  <>
                    <div className="col-12 col-md-6">
                      <select
                        className="form-select"
                        style={{ padding: "0.8rem" }}
                        name="currentPosition"
                        value={formData.currentPosition}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Current Position</option>
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="university">University</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    style={{ padding: "0.8rem" }}
                    placeholder="Enter your city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="row g-3">
                <h4 className="text-center">Choose your timezone</h4>
                {/* Timezone Select Dropdown */}
                <div
                  className="mt-5 d-flex justify-content-center mx-auto mb-5"
                  style={{ width: "60%" }}
                >
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select your timezone
                    </option>
                    {Intl.supportedValuesOf("timeZone").map((timezone) => (
                      <option key={timezone} value={timezone}>
                        {timezone}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {currentStep === 5 && (
              <div className="row g-2">
                <h4 className="text-center">Choose Your Instructors</h4>
                <div className="col-12">
                  <div className="row">
                    {instructors.map((instructor) => (
                      <div
                        key={instructor.id}
                        className="col-12 col-sm-4 col-md-4"
                      >
                        <div
                          className={`card ${
                            selectedInstructors.includes(instructor.id)
                              ? "border-danger"
                              : ""
                          }`}
                          onClick={() =>
                            handleInstructorSelection(instructor.id)
                          }
                          style={{
                            cursor: "pointer",
                            transition: "0.3s",
                            boxShadow: selectedInstructors.includes(
                              instructor.id
                            )
                              ? "0px 8px 15px rgba(238, 113, 113, 0.5)"
                              : "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <img
                            src={instructor.image}
                            className="card-img-top"
                            alt={instructor.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{instructor.name}</h5>
                            <p className="card-text">
                              {instructor.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6 */}
            {currentStep === 6 && (
              <div className="row g-3">
                <h4 className="text-center">Choose Your Date & Time</h4>
                <div className="col-12 col-md-6 mx-auto mb-3"> 
                    <input
                      type="date"
                      className="form-control border-primary"
                      style={{
                        padding: "0.8rem",
                        fontSize: "1rem",
                        borderRadius: "8px", 
                        backgroundColor: "#fdfdfd",
                        transition: "all 0.3s ease-in-out",
                      }}
                      name="selectedDate"
                      value={formData.selectedDate}
                      onChange={handleInputChange}
                      required
                    />    
                </div>

                {/* Show time buttons only if a date is selected */}
                {formData.selectedDate && (
                  <div className="col-12">
                    <div className="row g-3">
                      {timingSlots.map((slot, index) => (
                        <div className="col-6 col-md-4 col-lg-3" key={index}>
                          <button
                            type="button"
                            className={`btn w-100 ${
                              formData.selectedTime === slot.start
                                ? "btn-danger"
                                : "btn-outline-danger"
                            }`}
                            onClick={() => handleTimingSelection(slot.start)}
                          >
                            {slot.start} - {slot.end}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="wizard-btn mx-auto">
              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-5">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Back
                </button>

                {/* Show Next button only if it's not Step 4 */}
                {currentStep !== 6 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={nextStep}
                    disabled={currentStep === 6}
                  >
                    Next
                  </button>
                )}

                {/* Show Submit button only in Step 4 */}
                {currentStep === 6 && (
                  <button
                    type="submit"
                    className="btn btn-success text-center p-2 "
                  >
                    Submit
                  </button>
                )}
              </div>

              {/* Step Indicator */}
              <div className="mt-4 w-75 align-items-center mx-auto wizard-progressbar">
                <div className="progress" style={{ height: "5px" }}>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `${currentStep * 16.66}%` }}
                  ></div>
                </div>
                <small className="d-block text-center mt-2 text-muted">
                  Step {currentStep} of 6
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewDemoPage;
