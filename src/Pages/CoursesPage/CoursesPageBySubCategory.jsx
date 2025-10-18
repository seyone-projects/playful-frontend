import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import CourseCardBySubCategory from '../../Components/CourseCard/CourseCardBySubCategory';
import ScrollToTop from '../../Components/ScrollToTop';


function CoursePageBySubCategory() {
  return (
    <>
    <div className="main">
    <ScrollToTop />
    <Navbar />
    <div className="container my-5 pt-5 d-flex justify-content-center align-items-center">
    <CourseCardBySubCategory/>
    </div>
    <Footer />
    </div>
    </>
  )
}

export default CoursePageBySubCategory;