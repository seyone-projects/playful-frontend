import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import ContactForm from '../../Components/Contact/ContactForm';
import ScrollToTop from '../../Components/ScrollToTop'; 
 
function ContactPage() {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <div className="container"> 
      <div className="row">
         <ContactForm />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default ContactPage;