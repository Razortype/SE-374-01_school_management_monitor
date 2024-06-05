import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../services/api";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { toast } from "react-toastify";

const ClassStudentModal = ({ setIsChanged, closeModal, activeClass }) => {
  const [classStudents, setClassStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const { auth } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);

  const getAllStudents = () => {
    axios
      .get(`api/v1/admin/student?page=${currentPage}&size=7`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setAllStudents(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsChanged(false);
  }, [setIsChanged]);

  useEffect(() => {
    if (activeClass?.students) {
      setClassStudents(activeClass.students);
    }
  }, [activeClass]);

  useEffect(() => {
    getAllStudents();
  }, [currentPage]);

  useEffect(() => {
    console.log(classStudents);
  }, [classStudents]);

  const toggleStudent = (student) => {
    if (classStudents.some((st) => st.id === student.id)) {
      setClassStudents(classStudents.filter((st) => st.id !== student.id));
    } else {
      setClassStudents([...classStudents, student]);
    }
  };

  const handleAddRemoveStudent = () => {
    const studentsToAdd = classStudents.filter(
      (student) => !activeClass.students.some((st) => st.id === student.id)
    );

    const studentsToRemove = activeClass.students.filter(
      (student) => !classStudents.some((st) => st.id === student.id)
    );

    if (studentsToAdd.length > 0) {
      axios
        .put(
          `/api/v1/class/${activeClass.class_id}/student/add`,
          { student_list: studentsToAdd.map((student) => student.id) },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then(() => {
          toast.success("Students added successfully");
          closeModal();
          setIsChanged(true);
        })
        .catch((err) => {
          toast.error("An error occured!");
          closeModal();
          console.log(err);
        });
    }

    if (studentsToRemove.length > 0) {
      axios
        .put(
          `/api/v1/class/${activeClass.class_id}/student/remove`,
          { student_list: studentsToRemove.map((student) => student.id) },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then(() => {
          toast.success("Students removed successfully");
          closeModal();
          setIsChanged(true);
        })
        .catch((err) => {
          toast.error("An error occured!");
          closeModal();
          console.log(err);
        });
    }
  };

  return (
    <div className="model-container">
      <table style={{ marginTop: 0 }} className="table">
        <thead>
          <tr>
            <th>Add</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {allStudents?.map((student) => (
            <tr key={student.id}>
              <td className="status">
                <div
                  className={"w-4 h-4 bg-red-600"}
                  style={{
                    width: "15px",
                    height: "15px",
                    border: `1px solid ${
                      classStudents.some((st) => st.id === student.id)
                        ? "green"
                        : "red"
                    }`,
                    backgroundColor: `${
                      classStudents.some((st) => st.id === student.id)
                        ? "green"
                        : "red"
                    }`,
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                  onClick={() => toggleStudent(student)}
                ></div>
              </td>
              <td>
                {student.firstname} {student.lastname}
              </td>
              <td>{student.school_number}</td>
              <td>
                {student.email}
                <br />
                {student.phone_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-area">
        <button onClick={handleAddRemoveStudent} type="submit">
          {"Add / Remove Students"}
        </button>
      </div>
      <div
        style={{ marginTop: "auto", paddingTop: "20px" }}
        className="course-buttons"
      >
        <div
          onClick={() => setCurrentPage(currentPage - 1)}
          style={{
            pointerEvents: currentPage === 0 ? "none" : "auto",
            color: currentPage === 0 ? "#D7D7D9" : "inherit",
          }}
        >
          <PiCaretLeft />
          Previous
        </div>
        <div className="page">{currentPage + 1}</div>
        <div
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{
            pointerEvents: allStudents?.length < 7 ? "none" : "auto",
            color: allStudents?.length < 7 ? "#D7D7D9" : "inherit",
          }}
        >
          Next <PiCaretRight />
        </div>
      </div>
    </div>
  );
};

export default ClassStudentModal;
