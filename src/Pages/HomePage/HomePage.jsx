import BookDemoBtn from "../../Components/BookDemoBtn/BookDemoBtn";
import CareerSection from "../../Components/CareerSection/CareerSection";
import FeaturedCourses from "../../Components/FeaturedCourses/FeaturedCourses";
import Footer from "../../Components/Footer/Footer";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Navbar from "../../Components/Navbar/Navbar";
import ShareKnowledge from "../../Components/ShareKnowledge/ShareKnowledge";
import TopCategory from "../../Components/TopCategorySection/TopCategory"; 
import TrendingCourses from "../../Components/TrendingCourses/TrendingCourses";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TopCategory />
      <FeaturedCourses /> 
      <CareerSection />
      <TrendingCourses />
      <ShareKnowledge />
      <BookDemoBtn />
      <Footer />
    </>
  );
}

export default HomePage;
