import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import TestimonailCard from '../../Components/TestimonialCard/TestimonialCard';
import ScrollToTop from '../../Components/ScrollToTop'; 

function TestimonailsPage() {
  return (
    <>
    <div className="main">
    <ScrollToTop />
    <Navbar />
    <div className="container my-5 pt-5 d-flex justify-content-center align-items-center">
    <TestimonailCard/>
    </div>
    <Footer />
    </div>
    </>
  )
}

export default TestimonailsPage;