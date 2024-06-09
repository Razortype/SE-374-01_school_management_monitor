import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "../../../services/api";

const AddProductModal = ({ setIsChanged, closeModal }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const saveProduct = (e) => {
    e.preventDefault();

    if (formData.productName.length < 2) {
        toast.error('Product name should be longer than 2 characters.')
        return
    }
    if (formData.productDescription.length < 5) {
        toast.error('Product description should be longer than 5 characters.')
        return
    }
    if (formData.price.length < 1 ) {
        toast.error('Please enter a price.')
        return
    }

    axios
    .post(
      "/api/v1/product",
      {
        price: formData.price,
        product_name: formData.productName,
        product_description: formData.productDescription    
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
        courseTitle:"",
        courseCode: ""
      });
      setIsChanged(true);
      toast.success("Product saved succesfully.");
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      setFormData({
        productName: "",
        productDescription: "",
        price: "",
      });
      toast.error("An error occured, please try again!");
      setIsChanged(true);
    });

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setIsChanged(false);
  });
  return (
    <div className="model-container">
      <form className="model-form" onSubmit={saveProduct}>
        <div
          className="input-triple"
        >
          <div
            style={{
              width: "100%",
            }}
            className="triple-area"
          >
            <label className="input-label">Product Name</label>
            <input
              className="model-input"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div
            style={{
              width: "100%",
            }}
            className="triple-area"
          >
            <label className="input-label">Product Description</label>
            <input
              className="model-input"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              type="text"
              required
            />
          </div>

          <div
            className="triple-area"
          >
            <label className="input-label">Product Price</label>
            <input
              className="model-input"
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          
        </div>
        
        <div className="btn-area">
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
