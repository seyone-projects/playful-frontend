import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import config from '../../Config';
import "./TrainerCard.css";
import { GetUsersByRole } from "../../service/UserService";

function TrainerCard() {

  const { isLoading, setIsLoading, isAppError, setAppError, appErrorMessage, setAppErrorMessage, appErrorTitle, setAppErrorTitle, appErrorMode, setAppErrorMode, appUser } = useGlobalContext();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6; // adjust per page

const fetchUsers = async (page = 1) => {
  try {
    setIsLoading(true);
    var response = await GetUsersByRole("trainer", page, itemsPerPage);
    if (response && Array.isArray(response.users)) {
      const activeUsers = response.users.filter(user => user.status === "active");
      setUsers(activeUsers);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } else {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("No Users Found.");
      setAppErrorMode("error");
    }
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
    fetchUsers(currentPage);
  }, [currentPage]);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h2 className="category-card-title text-center my-4">
        Meet Our Trainers
      </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div
              className="col-md-4 col-sm-6 col-12"
              key={user._id}
            >
              <div className="crd_wrap">
                <div className="crd_imgbox">
                  <img
                    src={`${config.imageBasePath}/users/${user._id}.${user.image}`} // use API image
                    className="crd_img"
                    alt={user.username}
                  />
                </div>

                <div className="crd_body">
                  <h5 className="crd_title">{user.username}</h5>                 
                  <div className="crd_auth">
                    <span className="crd_name">Working from :  {user.joiningDate
                      ? (() => {
                        const date = new Date(user.joiningDate);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                      })()
                      : ''}</span>
                  </div>
                  <span className="crd_btn"><i class="fa-solid fa-city"></i> {user.cityId?.name}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No trainers are available.</p>
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

export default TrainerCard;
