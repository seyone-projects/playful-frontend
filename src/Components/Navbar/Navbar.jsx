import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/Images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { GetAllSection } from "../../service/SectionService";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open
  const location = useLocation();
  const dropdownRefs = useRef([]); // Array of dropdown refs

  const { isLoading, setIsLoading, isAppError, setAppError, appErrorMessage, setAppErrorMessage, appErrorTitle, setAppErrorTitle, appErrorMode, setAppErrorMode, appUser } = useGlobalContext();

  const [sections, setSections] = useState([]);

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
    } catch (error) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Failed to load data");
      setAppErrorMode("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Close dropdown if click happens outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDropdownToggle = (index, e) => {
    e.preventDefault();
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <nav className={`navbarWrapper ${scrolled ? "scrolled" : ""}`}>
      <div className="navContainer">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="PLAYFUL PENCILS LMS" />
          <span className="logoText">PLAYFUL PENCILS</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="mobileMenuToggle d-lg-none" onClick={toggleMenu}>
          <span className={`hamburger ${isOpen ? "active" : ""}`}></span>
        </div>

        {/* Nav Content */}
        <div className={`navContent ${isOpen ? "show" : ""}`}>
          <ul className="navLinks">
            <li><Link to="/" className={isActive("/")}>Home</Link></li>
            <li className='d-none'><Link to="/category" className={isActive("/category")}>Category</Link></li>

            {/* Dropdown 1 */}
            <li
              className={`dropdown ${activeDropdown === 0 ? "active" : ""}`}
              ref={(el) => (dropdownRefs.current[0] = el)}
            >
              <Link
                to="#"
                className="dropdown-toggle"
                onClick={(e) => handleDropdownToggle(0, e)}
              >
                Category
              </Link>
              <ul className="dropdown-menu">
                {Array.isArray(sections) && sections.length > 0 ? (
                  sections.map((section) => (
                    <li key={section._id}>
                      <Link to={`/category/${section._id}`}>{section.name}</Link> {/* use your section name */}
                    </li>
                  ))
                ) : (
                  <li className="text-center mt-2">No categorys are available.</li>
                )}
              </ul>
            </li>

            <li><Link to="/courses" className={isActive("/courses")}>Course</Link></li>

            {/* Dropdown 2 */}
            <li
              className={`dropdown ${activeDropdown === 1 ? "active" : ""}`}
              ref={(el) => (dropdownRefs.current[1] = el)}
            >
              <Link
                to="#"
                className="dropdown-toggle"
                onClick={(e) => handleDropdownToggle(1, e)}
              >
                Who Are We
              </Link>
              <ul className="dropdown-menu">
                <li className="d-none"><Link to="/page/about-us">About Us</Link></li>
                <li><Link to="/career">Careers</Link></li>
                <li><Link to="/our-trainers">Meet Our Trainers</Link></li>
                <li><Link to="/testimonials">Testimonial</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
              </ul>
            </li>

            {/* Dropdown 3 */}
            <li
              className={`dropdown ${activeDropdown === 2 ? "active" : ""}`}
              ref={(el) => (dropdownRefs.current[2] = el)}
            >
              <Link
                to="#"
                className="dropdown-toggle"
                onClick={(e) => handleDropdownToggle(2, e)}
              >
                Sign In
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="https://trainer.playfulpencil.in/" target="_blank">Tutor Login</Link></li>
                <li><Link to="https://student.playfulpencil.in/" target="_blank">Leaner Login</Link></li>
              </ul>
            </li>

            <li className="d-none"><Link to="#" className={isActive("/blog")}>Blog</Link></li>
          </ul>

          <div className="authButtons">
            <Link to="/demo" className="signInBtn bookDemoBtn">Book Demo</Link>
            <Link to="/login" className="signInBtn d-none">Sign in</Link>
            <Link to="/register" className="signUpBtn d-none">Sign up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
