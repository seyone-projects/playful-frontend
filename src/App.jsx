
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { useEffect } from "react";
import "./App.css";
import "./index.css";
import HomePage from "./Pages/HomePage/HomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ForgotPWPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import CategorysPage from "./Pages/CategorysPage/CategorysPage";
import CoursesPage from "./Pages/CoursesPage/CoursesPage";
import SinglePageCourse from "./Pages/SinglePageCourse/SinglePageCourse";
import ViewDemoPage from "./Pages/ViewDemoPage/ViewDemoPage";
import CoursesPageBySubCategory from "./Pages/CoursesPage/CoursesPageBySubCategory";
import AboutPage from "./Pages/Page/Page";
import CareerPage from "./Pages/CareerPage/CareerPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import TrainersPage from "./Pages/TrainersPage/TrainersPage";
import TestimonialsPage from "./Pages/TestimonialsPage/TestimonialsPage";
import SearchCategorysPage from "./Pages/SearchCategorysPage/SearchCategorysPage";


function App() {
  const {
    isLoading,
    setIsLoading,
    isAppError,
    setAppError,
    appErrorMessage,
    setAppErrorMessage,
    appErrorTitle,
    setAppErrorTitle,
    appErrorMode,
    setAppErrorMode,
    appUser,
    setAppUser,
    isLogin,
    setIsLogin,
    isLogoutRequest,
    setIsLogoutRequest,
  } = useGlobalContext();


  const handleRetry = () => {
    setAppError(false); // Close the modal when retry is triggered
  };


  return (
    <>
      {/* loading screen */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Modal Error Message */}
      {isAppError && (
        <div
          className={appErrorMode + " app-error-message modal d-block"} // `d-block` ensures it always displays
          tabIndex="-1"
          role="dialog"
          aria-labelledby="errorModalLabel"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // Optional backdrop styling
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="errorModalLabel">
                  {appErrorTitle}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleRetry}
                ></button>
              </div>
              <div className="modal-body">
                <p>{appErrorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}


      <Router>
        <main id="main" className="main">
          <Routes>
            <Route path="/demo" element={<ViewDemoPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:id" element={<CategorysPage />} />
            <Route path="/course/:id" element={<SinglePageCourse />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotpassword" element={<ForgotPWPage />} />
            <Route path="/courses/subCategoryId/:subCategoryId" element={<CoursesPageBySubCategory />} />
            <Route path="/page/:slug" element={<AboutPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/our-trainers" element={<TrainersPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
             <Route path="/search-category/:searchText/:sectionId" element={<SearchCategorysPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
