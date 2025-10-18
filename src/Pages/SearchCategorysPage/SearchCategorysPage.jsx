import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import SearchCategoryCard from '../../Components/SearchCategoryCard/SearchCategoryCard';
import ScrollToTop from '../../Components/ScrollToTop'; 

 
function SearchCategorysPage() {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <div className="container"> 

      <div className="row">
         <SearchCategoryCard />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default SearchCategorysPage;