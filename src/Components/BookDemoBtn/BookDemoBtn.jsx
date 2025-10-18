import { useNavigate } from "react-router-dom";
import "./BookDemoBtn.css";

function BookDemoBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/demo");  
  };

  return (
    <button 
      className="book-demo" 
      onClick={handleClick} 
      aria-label="Book a Demo"
    >
      Book <br /> Demo
    </button>
  );
}

export default BookDemoBtn;
