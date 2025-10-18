import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import CareerForm from '../../Components/Career/CareerForm';
import ScrollToTop from '../../Components/ScrollToTop'; 

 
function CareerPage() {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <div className="container"> 
      <div className="row">
         <CareerForm />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default CareerPage;