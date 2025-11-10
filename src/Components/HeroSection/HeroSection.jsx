import "./HeroSection.css";
import hero_bg from "../../assets/Images/Hero-bg.png";
import HeroCard from "./HeroCard";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../GlobalContext";
import { GetAllSection } from "../../service/SectionService";

function HeroSection() {

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

  const [sections, setSections] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // prevent default form submission  

    // Validation: input minimum 3 characters
    if (!searchText || searchText.trim().length < 3) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Please enter at least 3 characters in the search box.");
      setAppErrorMode("error");
      return;
    }

    // Validation: dropdown selection
    if (!selectedSection || selectedSection === "Category") {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Please select a category from the dropdown.");
      setAppErrorMode("error");
      return;
    }

    // If validation passes, navigate
    window.location.href = `/search-category/${searchText}/${selectedSection}`;
  };

  const fetchSections = async (page = 1) => {
    try {
      var response = await GetAllSection(page, 9999, "");
      if (response && Array.isArray(response.sections)) {
        const activeSections = response.sections.filter(section => section.status === "active");
        setSections(activeSections);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
      } else {
        setAppError(true);
        setAppErrorTitle("Error");
        setAppErrorMessage("No Users Found.");
        setAppErrorMode("error");
      }
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <>
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Text Content */}
            <div className="col-md-7 order-2 order-md-1 mb-5 mb-md-0">
              <div className="hero-content">
                <div className="home-slide-text mb-4">
                  <h5 className="subheading">The Leader in Online Learning</h5>
                  <h1 className="main-heading fs-1">
                    Engaging & <br /> Accessible Online <br /> Courses For All
                  </h1>
                  <p className="description text-muted fw-semibold fs-5 my-3">
                    Own your future by learning new skills online.
                  </p>
                </div>
                <div className="search-form-wrapper">
                  {/* Form */}
                  <form className="search-form d-flex align-items-center" onSubmit={handleSearchSubmit}>
                    {/* Search Input */}
                    <div className="input-wrapper">
                      <i className="fa-solid fa-magnifying-glass search-icon"></i>
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search Grammer, Vocabulary etc"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    {/* Category Dropdown */}
                    <select className="form-select category-dropdown w-25 fw-semibold"
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                    >
                      <option>Category</option>
                      {Array.isArray(sections) && sections.length > 0 ? (
                        sections.map((section) => (
                          <option value={section._id}>{section.name}</option>
                        ))
                      ) : (
                        <li className="text-center mt-2">No categorys are available.</li>
                      )}

                    </select>
                    {/* Submit Button */}
                    <button type="submit" className="btn btn-submit">
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </form>
                </div>

                <div className="trust-user">
                  <p className="mb-2 fs-5 text-muted fw-semibold">
                    Trusted by over 15K Users <br />
                    worldwide since 2024
                  </p>
                  <div className="trust-rating d-flex align-items-center">
                    <div className="rate-head me-3">
                      <h2>
                        <span className="fs-1 text-black">176</span>+
                      </h2>
                    </div>
                    <div className="rating d-flex align-items-center">
                      <h2 className="d-inline-block average-rating fs-1 fw-semibold">4.4</h2>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="col-md-5 d-flex justify-content-center order-1 order-md-2">
              <div className="img-container">
                <img src={hero_bg} alt="Hero" className="img-fluid hero-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <HeroCard />
    </>
  );
}

export default HeroSection;