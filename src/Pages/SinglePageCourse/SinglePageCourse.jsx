import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CertificateSection from "../../Components/CertificateSection/CertificateSection";
import "./SingleCourse.css";
import { assets } from "../../assets/Images/asset";
import ScrollToTop from '../../Components/ScrollToTop';
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import config from '../../Config';
import { GetByIdCourseDetails, GetLatestBatchByCourseId } from '../../service/CourseService';
import { GetById } from '../../service/BatchService';
import { GetByBatchId } from '../../service/LessonPlannerService';

function SinglePageCourse() {

  const { isLoading, setIsLoading, isAppError, setAppError, appErrorMessage, setAppErrorMessage, appErrorTitle, setAppErrorTitle, appErrorMode, setAppErrorMode, appUser } = useGlobalContext();

  const [course, setCourse] = useState(null);
  const [batchDetails, setBatchDetails] = useState({});
  const [lessonPlanners, setLessonPlanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { id } = useParams();

  const fetchCourseById = async () => {
    try {
      setIsLoading(true);
      var response = await GetByIdCourseDetails(id);
      if (response.status === 200) {
        setCourse(response.course);
        setCategoryId(response.course.categoryId);
        setSubCategoryIds(response.course.subCategoryIds);
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

  // Fetch latest batch
  const fetchLatestBatch = async () => {
    try {
      setIsLoading(true);
      const response = await GetLatestBatchByCourseId(id);
      console.log("latest batch", response);
      // Use latestBatchId directly
      const batchId = response.latestBatchId;
      if (batchId) {
        setBatchDetails({ _id: batchId }); // set a minimal batch object
        return batchId;
      } else {
        setBatchDetails({});
        return null;
      }
    } catch (error) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Failed to fetch latest batch details");
      setAppErrorMode("error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch lesson planners by batch ID
  const fetchLessonPlanners = async (batchId) => {
    if (!batchId) return; // exit if no batch ID
    try {
      setIsLoading(true);
      const response = await GetByBatchId(batchId);
      console.log("lesson planners", response);
      setLessonPlanners(response.lessonPlanners || []);
      setCurrentPage(response.currentPage || 1);
      setTotalPages(response.totalPages || 1);
      setTotalItems(response.totalItems || 0);
    } catch (error) {
      setAppError(true);
      setAppErrorTitle("Error");
      setAppErrorMessage("Failed to load lesson planners");
      setAppErrorMode("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Combined useEffect to fetch latest batch and then lesson planners
  React.useEffect(() => {
    const loadData = async () => {
      const latestBatchId = await fetchLatestBatch();
      if (latestBatchId) {
        await fetchLessonPlanners(latestBatchId); // pass batch ID here
      }
    };
    loadData();
  }, [id]);

  React.useEffect(() => {
    if (id != null && id != undefined && id != "") {
      fetchCourseById();
    }
  }, []);


  const courseTemp = {

    rating: 4.8,
    ratingCount: 3450,
    contentSummary:
      "Our course is designed to develop skills across all critical aspects of communication and comprehension, ensuring a well-rounded and effective learning experience.",

    faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          question: "What languages do you offer training in?",
          answer:
            "We offer training in multiple languages including French, Spanish, German, and more.",
        },
        {
          question: "How do your language programs work?",
          answer:
            "Our programs include interactive lessons, practical exercises, and real-life application scenarios.",
        },
        {
          question: "Who are your trainers?",
          answer:
            "Our trainers are certified professionals with extensive experience in language education.",
        },
        {
          question: "What sets Playful Penc apart?",
          answer:
            "We focus on immersive learning, cultural insights, and personalized guidance.",
        },
        {
          question: "How can I enroll in a course?",
          answer:
            "You can enroll via our website or contact our support team for assistance.",
        },
        {
          question:
            "What are the career opportunities after completing a course at Playful Penc?",
          answer:
            "Career opportunities include translation, interpretation, teaching, and international business roles.",
        },
        {
          question:
            "How do I get in touch with Playful Penc for further queries?",
          answer:
            "You can reach us via email, phone, or the contact form on our website.",
        },
        {
          question: "Can You Take French Classes Online in India?",
          answer:
            "Yes, we offer online French classes accessible from anywhere in India.",
        },
        {
          question: "How Long Will It Take for an Indian to Learn French?",
          answer:
            "The duration depends on the level of proficiency you aim for; it typically ranges from 3 to 12 months.",
        },
        {
          question:
            "Job Opportunities After Learning the French Language in India",
          answer:
            "Job opportunities include working as a translator, interpreter, or in international business roles.",
        },
        {
          question:
            "Which Certification is Best for the French Language in India?",
          answer:
            "The DELF and DALF certifications are globally recognized and highly recommended.",
        },
      ],
    },
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="single_page_container">
        <div className="container my-5 single-page-course">
          {/* Header Section */}
          {course && (
            <>
              <div className="row align-items-center mb-4 course-header" style={{
                backgroundImage: `url(${config.imageBasePath}/courses/${course._id}.${course.image})`,
              }}>
                <div className="col-md-9">

                  <h1 className="fw-bold single-course-header"
                  >{course.name}</h1>
                  <p className="text-white">Join us for our Comprehensive {course.categoryId?.name || "N/A"} {course.categoryId?.sectionId?.name} Programme! </p>
                  <div className="d-md-flex align-items-center mt-2">
                    <span className="badge me-3 single-course-span text-uppercase bg-secondary">
                      {course.categoryId?.name || "N/A"} {course.categoryId?.sectionId?.name}
                    </span>
                    <span className="badge me-3 single-course-span text-uppercase">
                      {Array.isArray(course.subCategoryIds) && course.subCategoryIds.length > 0
                        ? course.subCategoryIds.map((sub, index) => (
                          <span key={sub._id}>
                            {sub.name}{index < course.subCategoryIds.length - 1 ? ', ' : ''}
                          </span>
                        ))
                        : "N/A"}
                    </span>
                    <div className="d-flex align-items-center text-warning me-3 my-md-0 my-2 d-none">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`bi ${index < course.rating ? "bi-star-fill" : "bi-star"
                            }`}
                        ></i>
                      ))}
                      <span className="text-white ms-2 fw-semibold">
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-white fw-semibold  d-none">
                      ({course.ratingCount} ratings)
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Course Overview */}
          {course?.description && (
            <div className="mb-5">
              <h2 className="fw-bold mb-3">Course Overview</h2>
              <p className="text-secondary">{course.description}</p>
            </div>
          )}

          {/* Course Content */}
          {lessonPlanners && lessonPlanners.length > 0 && (
            <div className="mb-5">
              <h2 className="fw-bold mb-3">Course Content Outline</h2>

              {/* Calculate total duration */}
              <p className="text-secondary fw-semibold">
                {(() => {
                  const totalMinutes = lessonPlanners.reduce((total, lesson) => {
                    const duration = parseInt(
                      lesson.lessonDuration?.toString().replace(/\D/g, ""),
                      10
                    );
                    return total + (isNaN(duration) ? 0 : duration);
                  }, 0);

                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;

                  return `${hours > 0 ? hours + " hrs " : ""}${minutes > 0 ? minutes + " mins" : ""} (Including Exam Preparation)`;
                })()}
              </p>
              <p className="text-secondary d-none">{courseTemp.contentSummary}</p>
              <div className="accordion" id="courseContentAccordion">
                {lessonPlanners.map((lesson, lIndex) => (
                  <div className="accordion-item" key={lIndex}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#lesson-${lIndex}`}
                        aria-expanded="false"
                        aria-controls={`lesson-${lIndex}`}
                      >
                        {`${lIndex + 1}. ${lesson.lessonTopic || `Lesson ${lIndex + 1}`}`} – {lesson.lessonDuration} mins
                      </button>
                    </h2>
                    <div
                      id={`lesson-${lIndex}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#courseContentAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <p className="text-muted ms-4">{lesson.lessonDescription}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Certificate */}
          <div className="mt-3 mb-5">
            <CertificateSection />
          </div>

          {/* instructor part */}
          {lessonPlanners && lessonPlanners.length > 0 && (
            <div className="container my-5">
              <h2 className="fw-bold text-center mb-4">Our Expert Faculty</h2>
              <div className="row g-4">

                {/* Extract unique trainers */}
                {Array.from(
                  new Map(
                    lessonPlanners
                      .filter(lp => lp.trainerId) // only lessons with trainer
                      .map(lp => [lp.trainerId._id, lp.trainerId]) // map by unique _id
                  ).values()
                ).map((trainer, index) => (
                  <div className="col-md-6 col-lg-3" key={index}>
                    <div className="card shadow border-0">
                      <img
                        src={`${config.imageBasePath}/users/${trainer._id}.${trainer.image || 'jpg'}`}
                        className="card-img-top"
                        alt={trainer.username}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title fw-bold">
                          {trainer.username.charAt(0).toUpperCase() + trainer.username.slice(1)}
                        </h5>
                        {course && (
                          <p className="text-muted">
                            {course.categoryId?.name || "N/A"} {course.categoryId?.sectionId?.name} {trainer.role.charAt(0).toUpperCase() + trainer.role.slice(1)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mb-5">
            <h2 className="fw-bold mb-3">{courseTemp.faq.title}</h2>
            <div className="accordion" id="faqAccordion">
              {courseTemp.faq.questions.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${index}`}
                      aria-expanded="false"
                      aria-controls={`faq-${index}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`faq-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

}

export default SinglePageCourse;
