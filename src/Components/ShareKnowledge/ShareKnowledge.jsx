import { Link } from "react-router-dom";
import share_img from "../../assets/Images/share.png";
import "./ShareKnowledge.css";

const ShareKnowledge = () => {
  return (
    <section className="mentor-section py-5">
      <div className="container">
        <div className="row align-items-center justify-content-between g-5">
          {/* Illustration Section */}
          <div className="col-lg-6 col-md-12 mentor-section__image-container">
            <div className="position-relative">
              <img
                src={share_img}
                alt="Mentor Illustration"
                className="mentor-section__image img-fluid rounded-4 shadow-lg"
              />
              <div className="mentor-section__blob-shape"></div>
              
              {/* Stats Card */}
              <div className="mentor-stats bg-white rounded-4 shadow-sm p-3">
                <div className="mentor-stats__content d-flex align-items-center">
                  <i className="mentor-stats__icon bi bi-people-fill text-danger fs-4 me-2"></i>
                  <div className="mentor-stats__text">
                    <h5 className="mentor-stats__number mb-0 text-danger">2k+</h5>
                    <small className="mentor-stats__label text-muted">Active Mentors</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="col-lg-6 col-md-12">
            <div className="mentor-content my-5">
              <h2 className="mentor-content__title fw-bold mb-4">
                Want to share your knowledge? Join us as a Mentor
              </h2>
              <p className="mentor-content__description text-muted mb-4">
                High-definition video is video of higher resolution and quality than
                standard-definition. While there is no standardized meaning for
                high-definition, generally any video.
              </p>

              {/* Features List */}
              <div className="mentor-features mb-4">
                <div className="mentor-features__item d-flex align-items-center mb-3">
                  <i className="mentor-features__icon bi bi-check-circle-fill text-danger me-3 fs-4"></i>
                  <span className="mentor-features__text fs-5">Best Courses</span>
                </div>
                <div className="mentor-features__item d-flex align-items-center mb-3">
                  <i className="mentor-features__icon bi bi-check-circle-fill text-danger me-3 fs-4"></i>
                  <span className="mentor-features__text fs-5">Top-rated Instructors</span>
                </div>
                <div className="mentor-features__item d-flex align-items-center mb-3">
                  <i className="mentor-features__icon bi bi-check-circle-fill text-danger me-3 fs-4"></i>
                  <span className="mentor-features__text fs-5">Lifetime Access</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="mentor-cta d-flex gap-3">
                <button className="mentor-cta__primary rounded-pill">
                  Read More
                  <i className="mentor-cta__icon bi bi-arrow-right ms-2"></i>
                </button>
                <Link 
                  to="/career"
                  className="mentor-cta__link text-decoration-none align-self-center mentor-cta__secondary rounded-pill"
                >
                   Become a Mentor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareKnowledge;