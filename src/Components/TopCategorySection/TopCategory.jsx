import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../GlobalContext";
import config from '../../Config';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./TopCategory.css";
import { GetLatest } from "../../service/CategoryService";
import { GetByCategoryId } from "../../service/CourseService";

const TopCategory = () => {
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
  } = useGlobalContext();

  const [categories, setCategories] = useState([]);
  const [courseCounts, setCourseCounts] = useState({});

 const fetchCategoryList = async (page = 1) => {
  try {
    setIsLoading(true);
    const response = await GetLatest(page, 10);
    const categoriesData = (response.categories || []).filter(category => category.status === "active");
    setCategories(categoriesData);

    // Fetch course counts for each active category
    const counts = {};
    await Promise.all(
      categoriesData.map(async (category) => {
        const res = await GetByCategoryId(category._id);
        // Backend returns totalItems
        counts[category._id] = res?.totalItems || 0;
      })
    );
    setCourseCounts(counts);

  } catch (error) {
    setAppError(true);
    setAppErrorTitle("Error");
    setAppErrorMessage("Failed to load data");
    setAppErrorMode("error");
  } finally {
    setIsLoading(false);
  }
};



  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div className="container category-slider">
      {/* Section Header */}
      <div className="row align-items-center mb-4">
        <div className="col-md-8 mb-2">
          <p className="fav-course mb-1 fs-6 fw-bold">Favourite Course</p>
          <h2 className="fw-bold my-2">Top Category</h2>
          <p className="text-muted">
            Language is the key that unlocks a world of endless possibilities. Embrace the journey of foreign language learning, and watch as doors to new cultures, friendships, and opportunities swing wide open before you.
          </p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/category" className=" text-decoration-none top-category-btn">All Categories</Link>
        </div>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="swiper-custom"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link to={`/category`} className="text-decoration-none">
              <div className="card slider-card shadow-sm my-3 mx-1">
                <img
                  src={`${config.imageBasePath}/categorys/${category._id}.${category.image}`}
                  alt={category.name}
                  className="card-img-top slider-icon"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{category.name}</h5>
                  <p className="card-text">
                    {courseCounts[category._id] || 0} Courses
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCategory;
