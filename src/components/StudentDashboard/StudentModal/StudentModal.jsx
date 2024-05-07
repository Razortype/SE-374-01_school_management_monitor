import React, { useState } from "react";
import {
  PiPlusCircle,
  PiPlusCircleFill,
  PiUserCircleFill,
} from "react-icons/pi";
import "./StudentModal.css";
import axios from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

const StudentModal = ({ setIsChanged, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    studentId: "",
    password: "",
    birthday: "",
    classValue: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState();
  const { auth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "/api/v1/admin/create/student",
        {
          email: formData.email,
          password: formData.password,
          firstname: formData.name,
          lastname: formData.surname,
          school_number: formData.studentId,
          phone_number: formData.phoneNumber,
          birth_year: formData.birthday,
          class_name: formData.classValue,
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
          name: "",
          surname: "",
          studentId: "",
          password: "",
          birthday: "",
          classValue: "",
          email: "",
          phoneNumber: "",
        });
        setIsChanged(true);
        toast.success("Student saved succesfully.");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setFormData({
          name: "",
          surname: "",
          studentId: "",
          password: "",
          birthday: "",
          classValue: "",
          email: "",
          phoneNumber: "",
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
      <div className="img-container">
        <PiUserCircleFill className="user-icon" />
        <PiPlusCircleFill className="user-circle" />
      </div>
      <form onSubmit={saveStudent} className="model-form">
        <div className="input-triple">
          <div className="triple-area">
            <label className="input-label">Name</label>
            <input
              className="model-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              type="text"
            />
          </div>
          <div className="triple-area">
            <label className="input-label">Surname</label>
            <input
              className="model-input"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              type="text"
            />
          </div>
          <div className="triple-area">
            <label className="input-label">Student Id</label>
            <input
              className="model-input"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              type="number"
              maxLength="10"
              required
            />
          </div>
        </div>
        <div className="input-triple">
          <div className="triple-area">
            <input
              className="model-input"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
          </div>
          <div className="triple-area">
            <input
              className="model-input"
              name="birthday"
              placeholder="Birthday"
              value={formData.birthday}
              onChange={handleChange}
              min={1950}
              max={2024}
              type="number"
            />
          </div>
          <div className="triple-area">
            <input
              className="model-input"
              name="classValue"
              placeholder="Class"
              value={formData.classValue}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="input-double">
          <div className="triple-area">
            <label className="input-label">Email</label>
            <input
              className="double-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
          </div>
          <div className="triple-area">
            <label className="input-label">Phone Number</label>
            <input
              className="double-input"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="btn-area">
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentModal;
