import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import ScrollToTop from '../../Components/ScrollToTop'; 

 
function CategorysPage() {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <div className="container"> 

      <div className="row">
         <CategoryCard />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default CategorysPage;