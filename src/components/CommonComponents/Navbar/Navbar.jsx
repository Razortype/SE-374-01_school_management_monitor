import React, { useState } from "react";
import "./Navbar.css";
import useActiveTab from "../../../hooks/useActiveTab";
import { PiPlus, PiX, PiXBold } from "react-icons/pi";
import Modal from "../../Modal/Modal";
import StudentModal from "../../StudentDashboard/StudentModal/StudentModal";
import TeacherModal from "../../TeacherDashboard/TeacherModal/TeacherModal";
import CourseModal from "../../CourseDashboard/CourseModal/CourseModal";
import ClassModal from "../../ClassDashboard/ClassModal/ClassModal";

const Navbar = ({ setIsChanged }) => {
  const { activeTab, setActiveTab } = useActiveTab();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className="navbar"
      style={{
        marginLeft: "200px",
      }}
    >
      <p className="nav-heading">
        {activeTab[0]?.toUpperCase() + activeTab?.slice(1)}
      </p>
      <button onClick={handleOpenModal} className="nav-button">
        <PiPlus />
        Add {activeTab[0]?.toUpperCase() + activeTab?.slice(1, -1)}
      </button>

      {isModalOpen && (
        <Modal>
          <div className="modal-header">
            <h2>Add {activeTab[0]?.toUpperCase() + activeTab?.slice(1, -1)}</h2>
            <PiXBold className="close-btn" onClick={handleCloseModal} />
          </div>
          {activeTab === "students" ? (
            <>
              <StudentModal
                closeModal={handleCloseModal}
                setIsChanged={setIsChanged}
              />
            </>
          ) : activeTab === "teachers" ? (
            <TeacherModal
              closeModal={handleCloseModal}
              setIsChanged={setIsChanged}
            />
          ) : activeTab === "courses" ? (
            <CourseModal
              closeModal={handleCloseModal}
              setIsChanged={setIsChanged}
            />
          ) :
          activeTab === "classes" ? (
            <ClassModal
              closeModal={handleCloseModal}
              setIsChanged={setIsChanged}
            />
          )
          :  (
            ""
          )}
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
