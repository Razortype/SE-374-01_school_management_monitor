import React, { useEffect, useState } from "react";
import "./CourseDashboard.css";
import axios from "../../services/api";
import useAuth from "../../hooks/useAuth";
import {
  PiCaretLeft,
  PiCaretRight,
  PiPen,
  PiPenBold,
  PiPenFill,
} from "react-icons/pi";

const CourseDashboard = ({ isChanged }) => {
  const [courses, setCourses] = useState([]);
  const { auth } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);

  const getAllCourses = () => {
    axios
      .get(`api/v1/course?page=${currentPage}&size=9`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setCourses(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    getAllCourses();
  }, [currentPage]);


  useEffect(() => {
    isChanged && getAllCourses();
  }, [isChanged]);

  return (
    <div className="container">
      <div className="course-container">
        {courses.map((course) => (
          <>
            <div className="course-card" key={course.course_id}>
              <h3>{course.course_title}</h3>
              <p>{course.course_code}</p>
              <PiPenFill className="card-icon" />
            </div>
          </>
        ))}
      </div>

      <div className="course-buttons">
        <div
          onClick={()=>setCurrentPage(currentPage-1)}
          style={{
            pointerEvents: currentPage === 0 && "none",
            color: currentPage === 0 && "#D7D7D9",
          }}
        >
          <PiCaretLeft />
          Previous
        </div>
        <div className="page">{currentPage + 1}</div>
        <div
          onClick={()=>setCurrentPage(currentPage+1)}
          style={{
            pointerEvents: courses.length < 9 && "none",
            color: courses.length < 9  && "#D7D7D9",
          }}
        >
          Next <PiCaretRight />
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
