import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import config from '../../Config';
import "./CourseCard.css";
import { GetById } from "../../service/SubCategoryService";
import { GetAll } from "../../service/CourseService";

function CourseCard() {

  const { isLoading, setIsLoading, isAppError, setAppError, appErrorMessage, setAppErrorMessage, appErrorTitle, setAppErrorTitle, appErrorMode, setAppErrorMode, appUser } = useGlobalContext();

  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [subCategoryDetails, setSubCategoryDetails] = useState({});
  const [batchCourseDetails, setBatchCourseDetails] = useState({});
  const itemsPerPage = 6; // adjust per page

  const fetchCourses = async (page = 1) => {
    try {
      var response = await GetAll(page, itemsPerPage, "");
      if (response && Array.isArray(response.courses)) {
        const activeCourses = response.courses.filter(course => course.status === "active");
        setCourses(activeCourses);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
      }
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h2 className="category-card-title text-center my-4">
        Browse Courses
      </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              className="col-md-4 col-sm-6 col-12"
              key={course._id}
            >
              <Link to={`/course/${course._id}`} className="text-decoration-none">
                <div className="crd_wrap">
                  <div className="crd_imgbox">
                    <img
                      src={`${config.imageBasePath}/courses/${course._id}.${course.image}`} // use API image
                      className="crd_img"
                      alt={course.name}
                    />
                    <span className="crd_price d-none">
                      <span className="crd_oldp">₹{course.originalPrice}</span>
                      <span className="crd_newp">₹{course.discountedPrice}</span>
                    </span>
                  </div>

                  <div className="crd_body">
                    <div className="crd_auth">
                      <span className="crd_name">{course.categoryId?.name || "N/A"}</span>
                    </div>

                    <h5 className="crd_title">{course.name}</h5>

                    <div className="crd_meta d-none">
                      <span className="crd_item">
                        <i className="bi bi-collection-play"></i>
                        {course.lessons}+ Lessons
                      </span>
                      <span className="crd_item">
                        <i className="bi bi-clock"></i>
                        {course.duration}
                      </span>
                    </div>

                    <div className="crd_foot">
                      <div className="crd_rate d-none">
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`bi ${index < course.rating ? "bi-star-fill" : "bi-star"
                              }`}
                          ></i>
                        ))}
                        <span>
                          {4.0} ({15})
                        </span>
                      </div>
                      <button className="crd_btn">Read More</button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No courses are available.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-light mx-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${currentPage === index + 1 ? "btn-primary" : "btn-light"}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-light mx-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
