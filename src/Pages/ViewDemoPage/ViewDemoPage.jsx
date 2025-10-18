import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import config from "../../Config";
import book_demo from "../../assets/Images/demo_img.jpg";
import logo from "../../assets/Images/logo.png";
import user1 from "../../assets/Images/user2.jpg";
import user2 from "../../assets/Images/user6.jpg";
import user3 from "../../assets/Images/user7.jpg";
import "./ViewDemoPage.css";

import { GetAllState } from "../../service/StateService";
import { GetAllSection } from "../../service/SectionService";
import { GetBySectionId } from "../../service/CategoryService";
import { GetByCategoryId } from "../../service/SubcategoryService";
import { GetBySubCategoryId } from "../../service/CourseService";
import { GetUsersByRole } from "../../service/UserService";
import { Add } from "../../service/DemoRegisterService";
import { GetUsersByCourseId } from "../../service/UserCourseService";


const ViewDemoPage = () => {
  const {
    isLoading,
    setIsLoading,
    setAppError,
    setAppErrorMessage,
    setAppErrorMode,
    setAppErrorTitle,
    setAppSuccess,
    appUser,
  } = useGlobalContext();

  const [stateId, setStateId] = useState("");
  const [states, setStates] = useState([]);

  const [sectionId, setSectionId] = useState("");
  const [sections, setSections] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [categorys, setCategorys] = useState([]);

  const [subcategoryId, setSubcategoryId] = useState("");
  const [subCategorys, setSubCategorys] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);

  const [users, setUsers] = useState([]);

  const [selectedInstructors, setSelectedInstructors] = useState([]);

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    state: "",
    courseType: "",
    standard: "",
    board: "",
    section: "",
    category: "",
    subcategory: "",
    course: "",
    currentPosition: "",
    selectedDate: "",
    selectedTime: "",
    timezone: "",
    instructors: [],
  });

  // Fetch all states
  const FetchState = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllState(1, 1000, "");
      if (response && Array.isArray(response.states)) {
        const activeStates = response.states.filter(
          (cat) => cat.status === "active"
        );
        setStates(activeStates);
      } else {
        setAppError(true);
        setAppErrorMessage("No State Found.");
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage("Error loading master data");
      setAppErrorMode("Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch sections
  const FetchSection = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllSection(1, 1000, "");
      if (response && Array.isArray(response.sections)) {
        const activeSections = response.sections.filter(
          (cat) => cat.status === "active"
        );
        setSections(activeSections);
      } else {
        setAppError(true);
        setAppErrorMessage("No Section Found.");
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage("Error loading master data");
      setAppErrorMode("Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch category by section
  const FetchCategory = async (sectionId) => {
    setIsLoading(true);
    try {
      const response = await GetBySectionId(sectionId);
      if (response && Array.isArray(response.categories)) {
        const activeCategories = response.categories.filter(
          (cat) => cat.status === "active"
        );
        setCategorys(activeCategories);
      } else {
        setAppError(true);
        setAppErrorMessage("No Category Found.");
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage("Error loading master data");
      setAppErrorMode("Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch subcategory by category
  const FetchSubcategory = async (categoryId) => {
    setIsLoading(true);
    try {
      const response = await GetByCategoryId(categoryId, 1, 1000);
      if (response && Array.isArray(response.subCategorys)) {
        const activeSubcategories = response.subCategorys.filter(
          (cat) => cat.status === "active"
        );
        setSubCategorys(activeSubcategories);
      } else {
        setAppError(true);
        setAppErrorMessage("No Subcategory Found.");
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage("Error loading master data");
      setAppErrorMode("Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch course by subcategory
  const FetchCourse = async (subcategoryId) => {
    setIsLoading(true);
    try {
      const response = await GetBySubCategoryId(subcategoryId, 1, 1000);
      if (response && Array.isArray(response.courses)) {
        const activeCourses = response.courses.filter(
          (cat) => cat.status === "active"
        );
        setCourses(activeCourses);
      } else {
        setAppError(true);
        setAppErrorMessage("No Course Found.");
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage("Error loading master data");
      setAppErrorMode("Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users
  const fetchUsers = async (courseId) => {
    try {
      setIsLoading(true);
      const response = await GetUsersByCourseId(courseId);
      console.log("users", response);
      // Access the 'users' array correctly
      if (response?.data?.users && Array.isArray(response.data.users)) {
        const activeUsers = response.data.users.filter(
          (user) => user.status === "active"
        );
        setUsers(activeUsers);
      } else {
        setUsers([]);
        setAppError(true);
        setAppErrorMessage("No Instructors Found for this Course.");
      }
    } catch (error) {
      setAppError(true);
      setAppErrorMessage("Failed to load instructors for selected course.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    FetchState();
    FetchSection();
  }, []);

  // When section changes
  useEffect(() => {
    if (sectionId) {
      FetchCategory(sectionId);
      setCategorys([]);
      setCategoryId("");
      setSubCategorys([]);
      setSubcategoryId("");
      setCourses([]);
      setCourseId("");
      setFormData((prev) => ({ ...prev, section: sectionId }));
    }
  }, [sectionId]);

  // When category changes
  useEffect(() => {
    if (categoryId) {
      FetchSubcategory(categoryId);
      setSubCategorys([]);
      setSubcategoryId("");
      setCourses([]);
      setCourseId("");
      setFormData((prev) => ({ ...prev, category: categoryId }));
    }
  }, [categoryId]);

  // When subcategory changes
  useEffect(() => {
    if (subcategoryId) {
      FetchCourse(subcategoryId);
      setCourses([]);
      setCourseId("");
      setFormData((prev) => ({ ...prev, subcategory: subcategoryId }));
    }
  }, [subcategoryId]);

  // When course changes, fetch instructors for that course
  useEffect(() => {
    if (courseId) {
      fetchUsers(courseId);
      setFormData((prev) => ({ ...prev, course: courseId }));
    } else {
      setUsers([]); // clear users when no course is selected
    }
  }, [courseId]);


  // Handle input changes
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

  // VALIDATION: check required fields before moving to the next step
  const validateStep = (step) => {
    // reset any previous error state for clarity
    // We'll set errors explicitly when a field is missing
    // Step 1: Basic Info
    if (step === 1) {
      if (!formData.fullName || formData.fullName.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please enter your full name.");
        setAppErrorMode("error");
        return false;
      }
      if (!formData.phone || String(formData.phone).trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please enter your phone number.");
        setAppErrorMode("error");
        return false;
      }
      if (!formData.whatsapp || String(formData.whatsapp).trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please enter your Whatsapp number.");
        setAppErrorMode("error");
        return false;
      }
      if (!formData.email || formData.email.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please enter your email.");
        setAppErrorMode("error");
        return false;
      }
      if (!stateId || stateId.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please select your state.");
        setAppErrorMode("error");
        return false;
      }
    }

    // Step 2: course type - you are already using image clicks to set course type and call goToNextStep,
    // but in case someone navigates via Next button (unlikely), ensure courseType is set.
    if (step === 2) {
      if (!formData.courseType || formData.courseType.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please choose a course type.");
        setAppErrorMode("error");
        return false;
      }
    }

    // Step 3: course selection details
    if (step === 3) {
      if (formData.courseType === "academic") {
        if (!formData.standard || String(formData.standard).trim() === "") {
          setAppError(true);
          setAppErrorTitle("Validation Error");
          setAppErrorMessage("Please select standard.");
          setAppErrorMode("error");
          return false;
        }
        if (!formData.board || formData.board.trim() === "") {
          setAppError(true);
          setAppErrorTitle("Validation Error");
          setAppErrorMessage("Please select board.");
          setAppErrorMode("error");
          return false;
        }
      } else if (formData.courseType === "professional") {
        if (!formData.currentPosition || formData.currentPosition.trim() === "") {
          setAppError(true);
          setAppErrorTitle("Validation Error");
          setAppErrorMessage("Please select your current position.");
          setAppErrorMode("error");
          return false;
        }
      }
      if (!sectionId || sectionId.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please select section.");
        setAppErrorMode("error");
        return false;
      }
      if (!categoryId || categoryId.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please select category.");
        setAppErrorMode("error");
        return false;
      }
      if (!subcategoryId || subcategoryId.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please select subcategory.");
        setAppErrorMode("error");
        return false;
      }
      if (!courseId || courseId.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please select course.");
        setAppErrorMode("error");
        return false;
      }
    }

    // Step 4: timezone
    if (step === 4) {
      if (!formData.timezone || formData.timezone.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please choose your timezone.");
        setAppErrorMode("error");
        return false;
      }
    }

    // Step 5: instructor
    if (step === 5) {
      if (!selectedInstructors || selectedInstructors.length === 0) {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please choose an instructor.");
        setAppErrorMode("error");
        return false;
      }
    }

    // Step 6: date & time (this would be validated before submit too)
    if (step === 6) {
      if (!formData.selectedDate || formData.selectedDate.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please select a date.");
        setAppErrorMode("error");
        return false;
      }
      if (!formData.selectedTime || formData.selectedTime.trim() === "") {
        setAppError(true);
        setAppErrorTitle("Validation Error");
        setAppErrorMessage("Please select a time.");
        setAppErrorMode("error");
        return false;
      }
    }

    // if all checks pass, clear any existing error and return true
    setAppError(false);
    setAppErrorMessage("");
    return true;
  };

  // Next button now validates before moving forward
  const nextStep = () => {
    if (currentStep < 6) {
      const ok = validateStep(currentStep);
      if (ok) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Allow only one instructor selection
  const handleInstructorSelection = (id) => {
    let updatedList;
    if (selectedInstructors.includes(id)) {
      // Deselect if clicked again
      updatedList = [];
    } else {
      // Select only one
      updatedList = [id];
    }

    setSelectedInstructors(updatedList);
    setFormData((prev) => ({ ...prev, instructors: updatedList }));
  };


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

  // Submit data to DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    // final validation before send (validate step 6)
    if (!validateStep(6)) return;

    setIsLoading(true);
    try {
      const response = await Add(stateId, sectionId, categoryId, subcategoryId, courseId, selectedInstructors[0] || "", formData.fullName, formData.phone, formData.email, formData.whatsapp, formData.standard, formData.board, formData.currentPosition, formData.timezone, formData.selectedDate, formData.selectedTime);

      if (response.status === 200) {
        setAppError(true);
        setAppErrorTitle("Action Response");
        setAppErrorMessage(response.message || "Demo Registered successfully!");
        setAppErrorMode("success");
        window.location.href = "/demo";
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
                  />
                </div>
                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="state"
                    value={stateId}
                    onChange={(e) => setStateId(e.target.value)}
                  >
                    <option className="" value=""> Choose State </option>
                    {states.map(stateOption => (
                      <option key={stateOption._id} value={stateOption._id}>
                        {stateOption.name}
                      </option>
                    ))}
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


                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="row g-3 mb-5">
                {/* Show Standard and Board fields if courseType is academic */}
                {formData.courseType === "academic" && (
                  <>
                    <h4 className="text-center">Academic Course Details</h4>
                    <div className="col-12 col-md-6">
                      <select
                        className="form-select"
                        style={{ padding: "0.8rem" }}
                        name="standard"
                        value={formData.standard}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Standard</option>
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

                {formData.courseType === "professional" && (
                  <>
                    <h4 className="text-center">Professional Course Details</h4>
                    <div className="col-12 col-md-6">
                      <select
                        className="form-select"
                        style={{ padding: "0.8rem" }}
                        name="currentPosition"
                        value={formData.currentPosition}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Current Position</option>
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="university">University</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Always show Subject and Position fields */}
                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="section"
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                  >
                    <option value="">Select Section</option>
                    {sections.map(sectionOption => (
                      <option key={sectionOption._id} value={sectionOption._id}>
                        {sectionOption.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categorys.map(categoryOption => (
                      <option key={categoryOption._id} value={categoryOption._id}>
                        {categoryOption.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="subcategory"
                    value={subcategoryId}
                    onChange={(e) => setSubcategoryId(e.target.value)}
                  >
                    <option value="">Select SubCategory</option>
                    {subCategorys.map(subCategoryOption => (
                      <option key={subCategoryOption._id} value={subCategoryOption._id}>
                        {subCategoryOption.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    style={{ padding: "0.8rem" }}
                    name="course"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {courses.map(courseOption => (
                      <option key={courseOption._id} value={courseOption._id}>
                        {courseOption.name}
                      </option>
                    ))}
                  </select>
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
                    {Array.isArray(users) && users.length > 0 ? (
                      users.map((user) => (
                        <div key={user._id} className="col-12 col-sm-4 col-md-4 mb-3">
                          <div
                            className={`card ${selectedInstructors.includes(user._id) ? "border-danger" : ""}`}
                            onClick={() => handleInstructorSelection(user._id)}
                            style={{
                              cursor: "pointer",
                              transition: "0.3s",
                              boxShadow: selectedInstructors.includes(user._id)
                                ? "0px 8px 15px rgba(238, 113, 113, 0.5)"
                                : "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <img
                              src={`${config.imageBasePath}/users/${user._id}.${user.image}`}
                              className="card-img-top"
                              alt={user.username}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{user.username}</h5>
                              <p className="card-text">
                                Working from: {user.joiningDate
                                  ? new Date(user.joiningDate).toLocaleDateString("en-GB")
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center text-muted">
                        No instructors mapped to courses.
                      </div>
                    )}
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
                    min={(() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      return tomorrow.toISOString().split("T")[0]; // "YYYY-MM-DD" format for date input
                    })()}
                    onChange={handleInputChange}
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
                            className={`btn w-100 ${formData.selectedTime === slot.start
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
                {/* (your original comment assumed Step 4 but logic shows 6 steps; I retained behavior) */}
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
