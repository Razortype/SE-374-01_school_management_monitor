import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import {
  PiCaretLeft,
  PiCaretRight,
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
  const [studentCount, setStudentCount] = useState(0);
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
        setStudents(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStCount = () => {
    axios
      .get(`api/v1/admin/student?page=${currentPage}&size=1000`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setStudentCount(response.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    isChanged && getAllStudents();
  }, [isChanged]);

  useEffect(() => {
    isChanged && getStCount();
  }, [isChanged]);


  useEffect(() => {
    getAllStudents();
  }, []);

  useEffect(() => {
    getStCount();
  }, []);

  useEffect(() => {
    getAllStudents();
  }, [currentPage]);

  return (
    <div style={{
      height: 'calc(100vh - 80px)'
  }} className="container">
      <div className="cards">
        <div className="card card-blue">
          <h6 className="card-heading">All students</h6>
          <div className="card-bottom">
            <p>{studentCount}</p>
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
            <p>{studentCount}</p>
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
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
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
            </tr>
          ))}
         
        </tbody>
      </table>

      <div style={{
        marginTop: 'auto',
        paddingTop: '20px'
      }} className="course-buttons">
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
            pointerEvents: students.length < 7 && "none",
            color: students.length < 7  && "#D7D7D9",
          }}
        >
          Next <PiCaretRight />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
