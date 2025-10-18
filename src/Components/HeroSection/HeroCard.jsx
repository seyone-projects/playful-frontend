import pencil from "../../assets/images/pencil-icon.svg";
import course from "../../assets/images/cources-icon.svg";
import Certificate from "../../assets/images/certificate-icon.svg";
import graduate from "../../assets/images/gratuate-icon.svg";

function HeroCard() {
  return (
    <div className="container my-5 four-card">
      <div className="row text-center">
        {/* Card 1 */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card h-100 border-0 shadow-lg rounded-5">
            <div className="card-body d-flex flex-column flex-md-row justify-content-start align-items-center">
              <div className="rounded-circle bg-opacity-10 p-3 mb-3 mb-md-0 d-inline-block">
                <img src={pencil} alt="Courses-img" />
              </div>
              <div className="text-center text-md-start ms-md-3">
                <h5 className="card-title fw-bold mb-1 fs-3">100+</h5>
                <p className="text-muted mb-0">Online Courses</p>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card h-100 border-0 shadow-lg rounded-5">
            <div className="card-body d-flex flex-column flex-md-row justify-content-start align-items-center">
              <div className="rounded-circle bg-opacity-10 p-3 mb-3 mb-md-0 d-inline-block">
                <img src={course} alt="Expert-img" />
              </div>
              <div className="text-center text-md-start ms-md-3">
                <h5 className="card-title fw-bold mb-1 fs-3">25+</h5>
                <p className="text-muted mb-0">
                  Expert <br /> Tutors
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card h-100 border-0 shadow-lg rounded-5">
            <div className="card-body d-flex flex-column flex-md-row justify-content-start align-items-center">
              <div className="rounded-circle bg-opacity-10 p-3 mb-3 mb-md-0 d-inline-block">
                <img src={Certificate} alt="Certified-img" />
              </div>
              <div className="text-center text-md-start ms-md-3">
                <h5 className="card-title fw-bold mb-1 fs-3">50+</h5>
                <p className="text-muted mb-0">Certified Courses</p>
              </div>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card h-100 border-0 shadow-lg rounded-5">
            <div className="card-body d-flex flex-column flex-md-row justify-content-start align-items-center">
              <div className="rounded-circle bg-opacity-10 p-3 mb-3 mb-md-0 d-inline-block">
                <img src={graduate} alt="Graduated-img" />
              </div>
              <div className="text-center text-md-start ms-md-3">
                <h5 className="card-title fw-bold mb-1 fs-3">12K+</h5>
                <p className="text-muted mb-0">Online Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;