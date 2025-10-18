import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import TrainerCard from '../../Components/TrainerCard/TrainerCard';
import ScrollToTop from '../../Components/ScrollToTop'; 

function TrainersPage() {
  return (
    <>
    <div className="main">
    <ScrollToTop />
    <Navbar />
    <div className="container my-5 pt-5 d-flex justify-content-center align-items-center">
    <TrainerCard/>
    </div>
    <Footer />
    </div>
    </>
  )
}

export default TrainersPage;