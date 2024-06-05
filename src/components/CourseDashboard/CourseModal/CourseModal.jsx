import React, { useEffect, useState } from "react";
import "./CourseModal.css";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../services/api";
import { toast } from "react-toastify";
const CourseModal = ({ setIsChanged, closeModal }) => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseCode: "",
  });

  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveCourse = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.courseTitle.length < 3) {
        toast.error("Course title should be longer than 3 characters.");
        return;
      } else if (formData.courseCode.length > 10) {
        toast.error("Course code should be maximum 10 characters long.");
        return;
      }


    axios
    .post(
      "/api/v1/course",
      {
        course_title: formData.courseTitle,
        course_code: formData.courseCode,    
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      setLoading(false);
      setFormData({
        courseTitle:"",
        courseCode: ""
      });
      setIsChanged(true);
      toast.success("Course saved succesfully.");
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      setFormData({
        courseTitle:"",
        courseCode: ""
      });
      toast.error("An error occured, please try again!");
      setIsChanged(true);
    });
  };
  useEffect(() => {
    setIsChanged(false);
  }, []);

  return (
    <div className="model-container">
      <form onSubmit={saveCourse} className="model-form">
        <div style={{
            marginTop: '20px'
        }} className="input-double">
          <div style={{
            width:'100%',
          }} className="triple-area">
            <label className="input-label">Course Title</label>
            <input
              className="double-input"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className="triple-area">
            <label className="input-label">Course Code</label>
            <input
              className="double-input"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
        </div>

        <div className="btn-area">
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseModal;
