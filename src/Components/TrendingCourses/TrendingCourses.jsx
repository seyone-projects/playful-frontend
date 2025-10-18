import { Link } from "react-router-dom";
import TrendingCourseCard from "../CourseCard/TrendingCourseCard";
import "./TrendingCourses.css";

function TrendingCourses() {
  return (
    <div className="trending_courses-Container">
      <div className="container py-5">
        <div className="row align-items-center mb-4">
          <div className="col-md-8 mb-2">
            <p className="fav-course mb-1 fs-6 fw-bold">What’s New</p>
            <h2 className="fw-bold my-2">TRENDING COURSES</h2>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              aenean accumsan bibendum gravida maecenas augue elementum et
              neque.
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <Link
              to="/courses"
              className=" text-decoration-none top-category-btn"
            >
              All Courses
            </Link>
          </div>
        </div>
        <TrendingCourseCard />
      </div>
    </div>
  );
}

export default TrendingCourses;
