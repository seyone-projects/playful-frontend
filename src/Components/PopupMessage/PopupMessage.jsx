import  { useEffect } from 'react';
import './PopupMessage.css';

const PopupMessage = ({ message, onClose }) => {
  if (!message) return null;

  // Auto-close the popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Call the onClose function to close the popup
    }, 1000);

    // Clear timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopupMessage;
