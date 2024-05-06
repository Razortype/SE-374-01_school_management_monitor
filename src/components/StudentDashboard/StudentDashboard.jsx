import React from "react";
import "./StudentDashboard.css";
import {
  PiCheck,
  PiQuestion,
  PiQuestionMark,
  PiUsers,
  PiX,
} from "react-icons/pi";

const StudentDashboard = () => {
  return (
    <div className="container">
      <div className="cards">
        <div className="card card-blue">
          <h6 className="card-heading">All students</h6>
          <div className="card-bottom">
            <p>2,000</p>
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
            <p>1,500</p>
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
            <p>450</p>
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
            <p>50</p>
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
            <tr>
              <td>John Doe</td>
              <td>123456</td>
              <td>Active</td>
              <td>john.doe@example.com</td>
              <td>Mathematics</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>789012</td>
              <td>Inactive</td>
              <td>jane.smith@example.com</td>
              <td>History</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
};

export default StudentDashboard;
