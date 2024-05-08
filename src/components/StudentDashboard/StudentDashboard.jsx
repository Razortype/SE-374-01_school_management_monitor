import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import {
  PiCheck,
  PiQuestion,
  PiQuestionMark,
  PiUsers,
  PiX,
} from "react-icons/pi";
import axios from "../../services/api";
import useAuth from "../../hooks/useAuth";
import Pagination from "../Pagination/Paginaton";

const StudentDashboard = ({ isChanged }) => {
  const [students, setStudents] = useState([]);
  const { auth } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const getAllStudents = () => {
    axios
      .get("api/v1/admin/student", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setStudents(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    isChanged && getAllStudents();
    console.log("is changed değişti abey",isChanged)
  }, [isChanged]);

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="container">
      <div className="cards">
        <div className="card card-blue">
          <h6 className="card-heading">All students</h6>
          <div className="card-bottom">
            <p>{students.length}</p>
            <PiUsers
              style={{
                width: "1.7em",
                height: "1.7em",
              }}
            />
          </div>
        </div>
        <div className="card card-green">
          <h6 className="card-heading">Entered students</h6>
          <div className="card-bottom">
            <p>0</p>
            <PiCheck
              style={{
                width: "1.7em",
                height: "1.7em",
              }}
            />{" "}
          </div>
        </div>
        <div className="card card-red">
          <h6 className="card-heading">Exited students</h6>
          <div className="card-bottom">
            <p>{students.length}</p>
            <PiX
              style={{
                width: "1.7em",
                height: "1.7em",
              }}
            />{" "}
          </div>
        </div>
        <div className="card card-yellow">
          <h6 className="card-heading">Unknown Status</h6>
          <div className="card-bottom">
            <p>0</p>
            <PiQuestionMark
              style={{
                width: "1.7em",
                height: "1.7em",
              }}
            />{" "}
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>
                {student.firstname} {student.lastname}
              </td>
              <td>{student.school_number}</td>
              <td className="status">
                {
                  students.inScholl ? '' : 
                  <>
                  <span className="circle card-red"></span>
                  Exited at 14:00
                </>
                }
              </td>
              <td>
                {student.email}
              <br />
                {student.phone_number}
            </td>
            <td>
            {Math.floor(Math.random() * 2) === 0 ? "MA-3"
            :"MA-5"
            }
            </td>
            </tr>
          ))}
         
        </tbody>
      </table>


    </div>
  );
};

export default StudentDashboard;
