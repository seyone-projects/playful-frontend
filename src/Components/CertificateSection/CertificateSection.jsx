import { assets } from "../../assets/Images/asset";

const CertificateSection = () => {
  return (
    <div className="container-fluid bg-dark text-white py-5 position-relative rounded-4">
      <div className="container p-3">
        <div className="row align-items-center">
          <div className="col-md-6 col-12">
            <h6 className="text-uppercase text-primary" style={{letterSpacing:'1px'}}>Playful Pencils Embarks You on an Exciting Journey to Fluency and Cultural Enrichment!</h6>
            <h1 className="mt-3">Get A Certificate</h1>
            <p className="mt-4">
              Elevate your skills and boost your confidence with our certificate. Whether you`re aiming for personal growth or professional advancement, earning a certificate with us is your key to success. Gain recognition for your hard work and dedication, and open doors to exciting opportunities. Here`s why you should get certified with us:
            </p>
            <ul className="list-unstyled mt-3">
              <li className="d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                <span>Stand out from the crowd and gain recognition for your expertise.</span>
              </li>
              <li className="d-flex align-items-start mt-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                <span>Validate your skills and knowledge in your chosen field.</span>
              </li>
              <li className="d-flex align-items-start mt-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                <span>Unlock new opportunities for personal and professional growth.</span>
              </li>
            </ul>
            <p className="mt-4">
              Don`t wait any longer to invest in your future. Start your journey towards today`s achievement!
            </p>
          </div>
          <div className="col-md-6 col-12 text-center">
            <img
              src={assets.certificateimg}
              alt="Certificate Preview"
              className="img-fluid rounded shadow"
            />
            <button className="btn btn-warning mt-4 fw-semibold">Get Started →</button>
          </div>
        </div>
      </div>
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-10" style={{ zIndex: '-1' }}>
        <div className="snowfall"></div>
      </div>
    </div>
  );
};

export default CertificateSection;
