import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../services/api";
import { PiCaretLeft, PiCaretRight, PiXBold } from "react-icons/pi";
import "./ClassDashboard.css";
import Modal from "../Modal/Modal";
import ClassStudentModal from "./ClassStudentModal/ClassStudentModal";
import ClassEditModal from "./ClassEditModal/ClassEditModal";

const ClassDashboard = ({ isChanged }) => {
  const [classes, setClasses] = useState([]);
  const { auth } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [activeClass, setActiveClass] = useState();
  const [isChangedFromModal, setIsChangedFromModal] = useState(false);

  const getAllClasses = () => {
    axios
      .get(`api/v1/class?page=${currentPage}&size=13`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setClasses(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  useEffect(() => {
    getAllClasses();
  }, [currentPage]);

  useEffect(() => {
    isChanged && getAllClasses();
  }, [isChanged]);

  useEffect(() => {
    isChangedFromModal && getAllClasses();
  }, [isChangedFromModal]);


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
            <th>Class Name</th>
            <th>Class Code</th>
            <th>Students</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cl) => (
            <tr key={cl.class_id}>
              <td>{cl.class_name}</td>
              <td>{cl.class_code ?? "Null"}</td>
              <td>
                {cl.students.length}{" "}
                <button onClick={()=>{
                  setModalType("st");
                  setActiveClass(cl)
                  handleOpenModal();
                }} className="table-button">
                  (Add/Remove)
                </button>
              </td>
              <td
                className="edit"
                onClick={()=>{
                  setModalType("edit")
                  setActiveClass(cl)
                  handleOpenModal();
                }}
                style={{
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "auto",
        }}
        className="course-buttons"
      >
        <div
          onClick={() => setCurrentPage(currentPage - 1)}
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
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{
            pointerEvents: classes.length < 13 && "none",
            color: classes.length < 13 && "#D7D7D9",
          }}
        >
          Next <PiCaretRight />
        </div>
      </div>

      {isModalOpen && (
        <Modal>
          <div className="modal-header">
            <h2>{activeClass.class_name} {modalType === "st" ? "Students" : "Courses"} </h2>
            <PiXBold className="close-btn" onClick={handleCloseModal} />
          </div>
          {
            modalType === "st" ? <ClassStudentModal
             closeModal = {handleCloseModal}
             setIsChanged = {setIsChangedFromModal}
             activeClass = {activeClass}
            /> :
            modalType === "edit" ? 
            <ClassEditModal
            activeClass = {activeClass}
            closeModal = {handleCloseModal}
            setIsChanged = {setIsChangedFromModal}    
            /> :
            ""
          }
        </Modal>
      )}
    </div>
  );
};

export default ClassDashboard;
