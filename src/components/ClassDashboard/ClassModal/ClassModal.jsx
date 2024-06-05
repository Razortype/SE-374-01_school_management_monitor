import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../services/api";
import { toast } from "react-toastify";

const ClassModal = ({ setIsChanged, closeModal }) => {
  const [formData, setFormData] = useState({
    className: "",
    classCode: "",
  });

  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveClass = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.className.length < 3) {
        toast.error("Class name should be longer than 3 characters.");
        return;
      } else if (formData.classCode.length > 10) {
        toast.error("Class code should be maximum 10 characters long.");
        return;
      }


    axios
    .post(
      "/api/v1/class",
      {
        class_name: formData.className,
        class_code: formData.classCode,    
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
        className:"",
        classCode: ""
      });
      setIsChanged(true);
      toast.success("Class saved succesfully.");
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      setFormData({
        className:"",
        classCode: ""
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
      <form onSubmit={saveClass} className="model-form">
        <div style={{
            marginTop: '20px'
        }} className="input-double">
          <div style={{
            width:'100%',
          }} className="triple-area">
            <label className="input-label">Class Name</label>
            <input
              className="double-input"
              name="className"
              value={formData.className}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className="triple-area">
            <label className="input-label">Class Code</label>
            <input
              className="double-input"
              name="classCode"
              value={formData.classCode}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
        </div>

        <div className="btn-area">
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Add Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassModal;
