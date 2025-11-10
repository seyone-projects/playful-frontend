import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import config from '../../Config';
import "./SearchCategoryCard.css";
import { GetBySectionId } from "../../service/CategoryService";
import { SearchSubCategorys } from "../../service/SubCategoryService";
import { GetBySubCategoryId } from "../../service/CourseService";
import { GetById } from "../../service/SectionService";

const SearchCategoryCard = () => {
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
  const [subCategories, setSubCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const [currentSubPage, setCurrentSubPage] = useState(1);
  const [totalSubPages, setTotalSubPages] = useState(1);
  const [totalSubItems, setTotalSubItems] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const itemsPerPage = 6;

  const { searchText, sectionId } = useParams();
  const [sectionName, setSectionName] = useState("");

  //fetch section by id
  const fetchSectionById = async () => {
    try {
      setIsLoading(true);
      const response = await GetById(sectionId);
      console.log("section", response);
      setSectionName(response.section.name);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchSubCategories = async (searchTextParam = searchText, sectionIdParam = sectionId) => {
    try {
      setIsLoading(true);
      const response = await SearchSubCategorys(searchTextParam, sectionIdParam);
      console.log("SubCat Response:", response);

      // filter active subcategories only
      const subCats = (response.subCategories || []).filter(sub => sub.status === "active");

      setSubCategories(subCats);
      setCurrentSubPage(response.currentPage);
      setTotalSubPages(response.totalPages);
      setTotalSubItems(response.totalItems);

      // Fetch total courses for each active subcategory
      if (subCats.length > 0) {
        const updatedSubCats = await Promise.all(
          subCats.map(async (sub) => {
            const courseResp = await GetBySubCategoryId(sub._id, 1, 1000);
            return {
              ...sub,
              totalCourses: courseResp.status === 200 ? courseResp.courses?.length || 0 : 0,
            };
          })
        );
        setSubCategories(updatedSubCats);
      }
    } catch (error) {
      console.log(error);
      setSubCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubPageChange = (page) => {
    if (page >= 1 && page <= totalSubPages) {
      setCurrentSubPage(page);
      fetchSubCategories(searchText, sectionId);
    }
  };

  useEffect(() => {
    fetchSectionById();
    fetchSubCategories();
  }, [sectionId, searchText]);


  return (
    <div className="category-card-section container my-5">
      <h2 className="category-card-title text-center my-4">
        Browse {sectionName} By Categories
      </h2>

      {/* Cards */}
      <div className="row mt-5">
        {subCategories.length > 0 ? (
          subCategories.map((sub, index) => (
            <div
              key={index}
              className="category-card-item col-lg-4 col-md-6 col-sm-12 mb-4"
            >
              <Link to={`/courses/subCategoryId/${sub._id}`} className="text-decoration-none">
                <div className="category-card card shadow-sm">
                  <img
                    src={`${config.imageBasePath}/subCategorys/${sub._id}.${sub.image}`}
                    alt={sub.name}
                    className="category-card-image card-img-top"
                  />
                  <div className="category-card-body card-body d-flex justify-content-between align-items-center">
                    <h5 className="category-card-job-title card-title mb-0">
                      {sub.name}
                    </h5>
                    <span className="category-card-job-badge badge bg-danger">
                      Courses: {sub.totalCourses || 0}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="category-card-no-jobs text-center text-muted">
            No subcategories available in this category.
          </p>
        )}
      </div>

      {/* Subcategory Pagination */}
      {totalSubPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-light mx-1"
            onClick={() => handleSubPageChange(currentSubPage - 1)}
            disabled={currentSubPage === 1}
          >
            Prev
          </button>
          {[...Array(totalSubPages)].map((_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${currentSubPage === index + 1 ? "btn-primary" : "btn-light"}`}
              onClick={() => handleSubPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-light mx-1"
            onClick={() => handleSubPageChange(currentSubPage + 1)}
            disabled={currentSubPage === totalSubPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchCategoryCard;
