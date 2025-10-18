import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Page.css";
import { assets } from "../../assets/Images/asset";
import ScrollToTop from '../../Components/ScrollToTop';
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import config from '../../Config';
import { GetBySlug } from '../../service/PageService';

function AboutPage() {

  const { isLoading, setIsLoading, isAppError, setAppError, appErrorMessage, setAppErrorMessage, appErrorTitle, setAppErrorTitle, appErrorMode, setAppErrorMode, appUser } = useGlobalContext();

  const [page, setPage] = useState(null);
  const { slug } = useParams();

  const fetchPageBySlug = async () => {
    try {
      setIsLoading(true);
      var response = await GetBySlug(slug);
      setPage(response.page);
    } catch (error) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Failed to load data");
      setAppErrorMode("error");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (slug != null && slug != undefined && slug != "") {
      fetchPageBySlug();
    }
  }, []);


  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="single_page_container">
        <div className="container my-5 single-page-course">
          {/* Course Overview */}
          {page && (
            <div className="mb-5">
              <h2 className="fw-bold mb-3">{page.title}</h2>
              <p className="text-secondary" style={{ textAlign: 'justify' }}>{page.description}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );

}

export default AboutPage;
