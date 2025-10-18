import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import config from '../../Config';
import "./TestimonialCard.css";

function TestimonialCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Static testimonials
  const testimonials = [
  { 
    id: 1, 
    message: "This service is absolutely amazing! I was able to learn concepts that I once found difficult in such an easy and engaging way. The trainers are patient, knowledgeable, and always ready to help. I feel much more confident now and would highly recommend this platform to anyone looking to upskill. Truly a game-changer!", 
    author: "Alice", 
    role: "Student" 
  },
  { 
    id: 2, 
    message: "I learned so much from the trainers and their practical teaching methods. Every session was interactive and filled with real-world examples that made understanding much easier. The entire experience was smooth and enjoyable. I’ve already started applying the knowledge I gained in my career. Excellent experience overall!", 
    author: "Bob", 
    role: "Professional" 
  },
  { 
    id: 3, 
    message: "The staff here are extremely supportive and always available to guide you. From registration to course completion, everything was well-organized and professional. I especially appreciated the personal feedback I received during the sessions. It helped me improve significantly. Truly a very helpful and friendly environment!", 
    author: "Smith", 
    role: "Entrepreneur" 
  },
  { 
    id: 4, 
    message: "The courses offered here are well-structured, clear, and easy to follow. Each topic is explained in a detailed yet simple way that keeps you motivated throughout. The pace is perfect for both beginners and advanced learners. I’ve recommended it to my classmates too. A really well-designed learning experience!", 
    author: "Diana", 
    role: "Student" 
  },
  { 
    id: 5, 
    message: "This is a great platform to improve and strengthen your professional skills. The lessons are detailed, and the practical assignments make learning enjoyable. I could clearly see my progress with each module I completed. The trainers are highly skilled and approachable. Definitely worth the time and effort!", 
    author: "Ethan", 
    role: "Developer" 
  },
  { 
    id: 6, 
    message: "I absolutely loved the interactive sessions! The activities and live discussions made learning much more fun and effective. The instructors encourage participation, which keeps the energy high. I also liked how feedback was given immediately after tasks. It made the entire learning journey engaging and rewarding.", 
    author: "Fiona", 
    role: "Designer" 
  },
  { 
    id: 7, 
    message: "The guidance and support I received were excellent throughout my learning journey. The mentors went above and beyond to make sure I understood each concept clearly. The materials provided are detailed and easy to review later. It’s one of the best educational experiences I’ve had. Truly thankful to the team!", 
    author: "George", 
    role: "Student" 
  },
  { 
    id: 8, 
    message: "The trainers are highly professional and very experienced in their fields. Their teaching style is practical and engaging, ensuring every learner can keep up. I was impressed by the quality of the content and the clarity of explanations. The team’s professionalism really stands out. I would recommend this to all managers!", 
    author: "Hannah", 
    role: "Manager" 
  },
  { 
    id: 9, 
    message: "The course content is incredibly practical and useful for real-world scenarios. I found every module relevant and easy to apply in my daily work. The examples used in training are from current industry trends, which makes learning even more valuable. This platform truly bridges the gap between theory and practice.", 
    author: "Ian", 
    role: "Student" 
  },
];


  const totalItems = testimonials.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentItems = testimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <h2 className="category-card-title text-center my-4">
        Testimonials
      </h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentItems.map((item) => (
          <div className="col-md-4 col-sm-6 col-12" key={item.id}>
            <div className="testimonial-card">
              <div className="testimonial-body">
                <p className="testimonial-text">"{item.message}"</p>
                <h5 className="testimonial-author">- {item.author}</h5>
                <p className="testimonial-role">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
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

export default TestimonialCard;
