import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import useAuth from "../../hooks/useAuth";
import "./TeacherDashboard.css";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

const TeacherDashboard = ({ isChanged }) => {
  const [teachers, setTeachers] = useState([]);
  const { auth, setAuth } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);

  const getAllTeachers = () => {
    axios
      .get(`api/v1/admin/teacher?page=${currentPage}&size=13`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setTeachers(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  useEffect(() => {
    isChanged && getAllTeachers();
  }, [isChanged]);

  useEffect(() => {
    getAllTeachers();
  }, [currentPage]);

  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
      }}
      className="container"
    >
      <table
        style={{
          marginTop: "0",
        }}
        className="table"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Profession</th>
            <th>Birth Year</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
        {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                {teacher.firstname} {teacher.lastname}
              </td>
              <td>{teacher.profession}</td>
              <td className="status">
                {teacher.birth_year}
              </td>
              <td>
                {teacher.email}
              <br />
                {teacher.phoneNumber}
            </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div style={{
        marginTop: 'auto'
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
            pointerEvents: teachers.length < 13 && "none",
            color: teachers.length < 13  && "#D7D7D9",
          }}
        >
          Next <PiCaretRight />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
