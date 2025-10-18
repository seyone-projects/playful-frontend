import './CareerSection.css';
//  This Part For CareerSection
import instructorImg from "../../assets/images/icon-1.svg";
import cloudImg from "../../assets/images/icon-2.svg";
import certificationImg from "../../assets/images/icon-3.svg";
import skillsImg from "../../assets/images/icon-4.svg";
import rightImage from "../../assets/images/join.png";
// Career section End Here
import PropTypes from 'prop-types';


const careerItems = [
    { icon: instructorImg, title: "Stay motivated with engaging instructors" },
    { icon: cloudImg, title: "Keep up with the latest in cloud" },
    {
      icon: certificationImg,
      title: "Get certified with 100+ certification courses",
    },
    { icon: skillsImg, title: "Build skills your way, from labs to courses" },
  ];
const CareerSection = () => {
    return (
        <div className="career-section">
            <div className="career-left">
                <div className="career-header">
                    <h3 className='fs-6 fw-bold mb-1'>What’s New</h3>
                    <h2>Master the skills to drive your career</h2>
                    <div className="career-content">Get certified, master modern tech skills, and level up your career — whether you’re starting out or a seasoned pro. 95% of eLearning learners report our hands-on content directly helped their careers.</div>
                </div>
                <div className="career-items">
                    {careerItems.map((item, index) => (
                        <CareerItem key={index} item={item} />
                    ))}
                </div>
            </div>
            <div className="career-right">
                <img src={rightImage} alt="Career"/> 
            </div>
        </div>
    );
};

const CareerItem = ({ item }) => {
    return (
        <div className="career-item">
            <img src={item.icon} alt={item.title} />
            <div>
                <p>{item.title}</p>
            </div>
        </div>
    );
};

CareerItem.propTypes = {
    item: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  };

export default CareerSection;
