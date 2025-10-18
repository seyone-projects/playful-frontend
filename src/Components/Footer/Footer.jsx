import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/Images/logo.png";
import { useGlobalContext } from "../../GlobalContext";
import { GetAll } from "../../service/PageService";
import { useEffect, useState } from "react";

const CurrentYear = () => {
  const year = new Date().getFullYear(); // gets current year dynamically
  return <span>{year}</span>;
};

const Footer = () => {
  const { setIsLoading, setAppError, setAppErrorMessage, setAppErrorTitle, setAppErrorMode } =
    useGlobalContext();

  const [pages, setPages] = useState([]);

  const fetchPages = async () => {
    try {
      setIsLoading(true);
      const response = await GetAll(1, 9999, "");
      if (response && Array.isArray(response.pages)) {
        const activePages = response.pages.filter((page) => page.status === "active");
        setPages(activePages);
      } else {
        setAppError(true);
        setAppErrorTitle("Error");
        setAppErrorMessage("No Pages Found.");
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
    fetchPages();
  }, []);

  return (
    <footer className="footer py-5">
      <div className="container-fluid px-3">
        <div className="row px-3">
          {/* Logo */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-brand">
              <Link to="/" className="logo">
                <img src={logo} alt="PLAYFULL PENCILS LMS" />
                <div className="logoText">PLAYFUL PENCILS</div>
              </Link>
              <p className="footer-desc text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                consequat mauris lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
            </div>
          </div>

          {/* For Instructor */}
          <div className="col-lg-3 col-md-6 mb-4 instructor-footer">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-muted text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="text-muted text-decoration-none">
                  Course
                </a>
              </li>
              <li>
                <a href="/career" className="text-muted text-decoration-none">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact-us" className="text-muted text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* For Student */}
          <div className="col-lg-3 col-md-6 mb-4 student-footer">
            <h5 className="footer-title">Important Links</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://trainer.playfulpencil.in/"
                  className="text-muted text-decoration-none"
                  target="_blank"
                >
                  Tutor Login
                </a>
              </li>
              <li>
                <a
                  href="https://student.playfulpencil.in/"
                  className="text-muted text-decoration-none"
                  target="_blank"
                >
                  Leaner Login
                </a>
              </li>
              <li>
                <a href="/our-trainers" className="text-muted text-decoration-none">
                  Meet Our Trainers
                </a>
              </li>
              <li>
                <a href="/demo" className="text-muted text-decoration-none">
                  Demo Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6 mb-4 text-muted">
            <h5 className="footer-title">Reach Us</h5>
            <div className="mb-3 d-none">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
              />
            </div>
            <div className="contact-info">
              <div className="d-flex mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>
                <p className="contact-p mb-0">New York, NY, USA</p>
              </div>
              <div className="d-flex mb-2">
                <i className="bi bi-chat-text-fill me-2"></i>
                <p className="contact-p mb-0">dreamslms@example.com</p>
              </div>
              <div className="d-flex">
                <i className="bi bi-telephone-outbound-fill me-2"></i>
                <p className="contact-p mb-0">+00 00000 00000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-wrapper mt-4 border-top border-black pt-3">
          <div
            className={`d-flex flex-wrap justify-content-${pages?.length ? "between" : "center"
              } align-items-center text-center`}
          >
            {/* Left Side (Dynamic Pages from DB) */}
            {pages?.length > 0 && (
              <div className="footer-links d-flex flex-wrap ms-3 justify-content-center justify-content-md-start">
                {pages.map((page, index) => (
                  <span key={index} className="d-flex align-items-center">
                    <Link
                      to={`/page/${page.slug}`}
                      className="text-decoration-none text-dark"
                    >
                      {page.title}
                    </Link>
                    {/* Add separator only if not the last page */}
                    {index < pages.length - 1 && (
                      <span className="mx-2">|</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Right Side (© Text) */}
            <div
              className={`footer-bottom-text ${pages?.length
                ? "me-3 text-center text-md-end mt-2 mt-md-0"
                : "text-center"
                }`}
            >
              <p className="mb-0">
                © <CurrentYear /> Playful Pencil. All rights reserved.
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
