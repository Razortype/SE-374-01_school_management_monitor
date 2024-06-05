import React, { useState } from "react";
import {
  PiCaretDown,
  PiPlusCircle,
  PiPlusCircleFill,
  PiUserCircleFill,
} from "react-icons/pi";
import "./TeacherModal.css";
import axios from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

const TeacherModal = ({ setIsChanged, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    password: "",
    birthday: "",
    profession: "",
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

  const saveTeacher = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.phoneNumber.length !== 11) {
      toast.error("Phone number should be 11 digits.");
      return;
    } else if (formData.password.length < 4) {
      toast.error("Phone should be at least 4 letters.");
      return;
    } else if (formData.profession === "") {
      toast.error("Please select a profession.");
      return;
    }

    axios
      .post(
        "/api/v1/admin/create/teacher",
        {
          email: formData.email,
          password: formData.password,    
          firstname: formData.name,
          lastname: formData.surname,
          profession: formData.profession,
          phone_number: formData.phoneNumber,
          birth_year: parseInt(formData.birthday),
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
          password: "",
          birthday: "",
          profession: "",
          email: "",
          phoneNumber: "",
        });
        setIsChanged(true);
        toast.success("Teacher saved succesfully.");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setFormData({
          name: "",
          surname: "",
          password: "",
          birthday: "",
          profession: "",
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
      <form onSubmit={saveTeacher} className="model-form">
        <div className="input-double">
          <div className="triple-area">
            <label className="input-label">Name</label>
            <input
              className="double-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className="triple-area">
            <label className="input-label">Surname</label>
            <input
              className="double-input"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="input-double">
          <div className="triple-area">
            <label className="input-label">Profession</label>
            <div className="select-container">
              <select
                className="double-input"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                type="text"
                required
              >
                <option value="">Select a profession</option>
                <option value="NOT_DEFINED">NOT DEFINED</option>
                <option value="MATHEMATICIAN">MATHEMATICIAN</option>
                <option value="COMPUTER_SCIENTIST">COMPUTER SCIENTIST</option>
              </select>
              <PiCaretDown className="select-icon" />
            </div>
          </div>
          <div className="triple-area">
            <label className="input-label">Birth Year</label>
            <input
              className="double-input"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              min={1950}
              max={2024}
              type="number"
            />
          </div>
        </div>
        <div className="input-double">
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
          <div className="triple-area">
            <label className="input-label">Password</label>
            <input
              className="double-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="btn-area">
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherModal;
