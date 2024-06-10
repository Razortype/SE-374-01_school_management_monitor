import React, { useEffect, useState } from "react";
import "./ClassEditModal.css";
import { FaPlus } from "react-icons/fa";
import { PiCaretDown, PiX, PiXBold, PiXCircle, PiXCircleBold } from "react-icons/pi";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../services/api";
import { toast } from "react-toastify";

const ClassEditModal = ({ setIsChanged, closeModal, activeClass }) => {
  const [formData, setFormData] = useState({
    teacherId: "",
    courseId: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [courses, setCourses] = useState();
  const [teachers, setTeachers] = useState();
  const { auth } = useAuth();

  const getAllCourses = () => {
    axios
      .get(`api/v1/course?page=0&size=1000`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllTeachers = () => {
    axios
      .get(`api/v1/admin/teacher?page=0&size=1000`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setTeachers(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCourseSection = () => {
    const [startTime, endTime] = selectedTime.time.split(" - ");

    if (formData.teacherId === "") {
      toast.error("Please select a teacher.");
      return;
    }
    if (formData.teacherId === "") {
      toast.error("Please select a course.");
      return;
    }

    axios
      .post(
        `/api/v1/class/${activeClass.class_id}/section/add`,
        {
          teacher_id: formData.teacherId,
          course_id: formData.courseId,
          week_day: selectedTime.day,
          start_time: startTime,
          end_time: endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success("Section added successfully");
        setModalOpened(false);
        closeModal();
        setIsChanged(true);
      })
      .catch((err) => {
        toast.error("An error occured!");
        setModalOpened(false);
        console.log(err);
      });
  };

  const deleteSection = (sectionId) => {
    axios.delete(`/api/v1/class/${activeClass.class_id}/section/${sectionId}/remove`,{
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    .then(()=> {
      toast.success("Course deleted succesfully")
      closeModal();
      setIsChanged(true);
    })
    .catch((err) => {
      toast.error("An error occured");
      closeModal();
      console.log(err);
    })
  }

  const handleClick = (row, col) => {
    setSelectedTime({
      day:
        col === "second"
          ? "MONDAY"
          : col === "third"
          ? "TUESDAY"
          : col === "fourth"
          ? "WEDNESDAY"
          : col === "fifth"
          ? "THURSDAY"
          : col === "sixth"
          ? "FRIDAY"
          : null,
      time:
        row === "second"
          ? "08:00:00 - 09:00:00"
          : row === "third"
          ? "09:15:00 - 10:15:00"
          : row === "fourth"
          ? "10:30:00 - 11:30:00"
          : row === "fifth"
          ? "12:30:00 - 13:30:00"
          : row === "sixth"
          ? "13:45:00 - 14:45:00"
          : row === "seventh"
          ? "15:00:00 - 16:00:00"
          : null,
    });
    setModalOpened(true);
  };

  const getRowAndCol = (startTime, day) => {
    let row;
    let col;
    row =
      startTime === "08:00:00"
        ? "second"
        : startTime === "09:15:00"
        ? "third"
        : startTime === "10:30:00"
        ? "fourth"
        : startTime === "12:30:00"
        ? "fifth"
        : startTime === "13:45:00"
        ? "sixth"
        : startTime === "15:00:00"
        ? "seventh"
        : "";
    col =
      day === "MONDAY"
        ? "second"
        : day === "TUESDAY"
        ? "third"
        : day === "WEDNESDAY"
        ? "fourth"
        : day === "THURSDAY"
        ? "fifth"
        : day === "FRIDAY"
        ? "sixth"
        : "";
    return [row, col];
  };

  const getCourseTitle = (sectionId) => {
    console.log(sectionId);
    let crs = courses?.find((course) => course.course_id === sectionId);
    console.log("Course: ", crs);
    return crs;
  };

  const getTeacher = (teacherId) => {
    let tchr = teachers?.find((teacher) => teacher.teacher_id === teacherId);
    return tchr;
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    getAllTeachers();
  }, []);

  useEffect(() => {
    console.log(activeClass);
  }, []);

  useEffect(() => {
    setIsChanged(false);
  }, [setIsChanged]);

  return (
    <>
      <div className="class-container">
        <div className="first-row first-col"></div>
        <div className="first-row second-col empty-cell">MON</div>
        <div className="first-row third-col  empty-cell">TUE</div>
        <div className="first-row fourth-col  empty-cell">WED</div>
        <div className="first-row fifth-col  empty-cell">THU</div>
        <div className="first-row sixth-col  empty-cell">FRI</div>
        <div className="second-row first-col">8:00 - 9:00 AM</div>
        <div className="third-row first-col">9:15 - 10:15 AM</div>
        <div className="fourth-row first-col">10:30 - 11:30 AM</div>
        <div className="fifth-row first-col">12:30 - 13:30 AM</div>
        <div className="sixth-row first-col">13:45 - 14:45 AM</div>
        <div className="seventh-row first-col">15:00 - 16:00 AM</div>

        {["second", "third", "fourth", "fifth", "sixth", "seventh"].map((row) =>
          ["second", "third", "fourth", "fifth", "sixth"].map((col) => (
            <div
              className={`${row}-row ${col}-col empty-cell`}
              onClick={() => handleClick(row, col)}
            >
              <div className="add-button">
                <FaPlus />
              </div>
            </div>
          ))
        )}

        {activeClass?.course_sections?.map((sec) => (
          <div
            className={`z-3 ${
              getRowAndCol(sec.start_time, sec.week_day)[0]
            }-row ${getRowAndCol(sec.start_time, sec.week_day)[1]}-col`}
          >
            <div className="class-course-card ">
              <p>{getCourseTitle(sec.course_id)?.course_code}</p>
              <p>{getTeacher(sec.teacher_id)?.firstname.split(" ")[0]}</p>
              <PiXCircleBold
              onClick={()=>deleteSection(sec.course_section_id)}
            style={{
              position: 'absolute',
              top: 3,
              right: 5,
              width: '1.5em',
              height: '1.5em',
              color: 'white',
              cursor: 'pointer'
            }}
            />  
            </div>

          </div>
        ))}
      </div>

      {modalOpened && (
        <div className="course-section-modal">
          <div className="course-modal-container">
            <div className="modal-header">
              <h2>Add Course Section</h2>
              <PiXBold
                className="close-btn"
                onClick={() => setModalOpened(false)}
              />
            </div>
            <div className="course-modal-form">
              <div className="course-area">
                <label className="class-input-label">Day:</label>
                <input
                  className="course-modal-input"
                  disabled={true}
                  value={selectedTime?.day}
                />
              </div>
              <div className="course-area">
                <label className="class-input-label">Time:</label>
                <input
                  className="course-modal-input"
                  disabled={true}
                  value={selectedTime?.time}
                />
              </div>

              <div className="course-area">
                <label className="class-input-label">Course:</label>
                <div className="select-container">
                  <select
                    className="course-modal-input"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    type="text"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option value={course.course_id}>
                        {course.course_title}
                      </option>
                    ))}
                  </select>
                  <PiCaretDown className="select-icon" />
                </div>
              </div>

              <div className="course-area">
                <label className="class-input-label">Teacher:</label>
                <div className="select-container">
                  <select
                    className="course-modal-input"
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                    type="text"
                    required
                  >
                    <option value="">Select a teacher</option>
                    {teachers.map((teacher) => (
                      <option value={teacher.teacher_id}>
                        {teacher.firstname} {teacher.lastname}
                      </option>
                    ))}
                  </select>
                  <PiCaretDown className="select-icon" />
                </div>
              </div>

              <div className="btn-area">
                <button onClick={saveCourseSection} type="submit">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassEditModal;
