import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "../../../services/api";

const EditProductModal = ({ setIsChanged, closeModal, activeElement }) => {
    const [formData, setFormData] = useState({
        productName: activeElement.product_name,
        productDescription: activeElement.product_description,
        price: activeElement.price,
        quantity: activeElement.quantity_in_stock
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
        if (formData.quantity.length < 1 ) {
            toast.error('Please enter a price.')
            return
        }
    
        axios
        .put(
          `/api/v1/product/${activeElement.product_id}`,
          {
            price: formData.price,
            product_name: formData.productName,
            product_description: formData.productDescription,
            quantity_in_stock: formData.quantity
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
            productName: "",
            productDescription: "",
            price: "",
            quantity: ""
          });
          setIsChanged(true);
          toast.success("Product edited succesfully.");
          closeModal();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setFormData({
            productName: "",
            productDescription: "",
            price: "",
            quantity: ""
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
              className="input-double"
            >
              <div
                style={{
                  width: "100%",
                }}
                className="triple-area"
              >
                <label className="input-label">Product Name</label>
                <input
                  className="double-input"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  type="text"
                  required
                />
              </div>
              <div
                className="triple-area"
              >
                <label className="input-label">Product Description</label>
                <input
                    className="double-input"
                    name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  type="text"
                  required
                />
              </div>
    
            </div>
            <div
              className="input-double"
            >
            <div
                className="triple-area"
                style={{
                    width: "100%",
                  }}
              >
                <label className="input-label">Product Price</label>
                <input
                  className="double-input"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  required
                />
              </div>
              <div
                className="triple-area"
              >
                <label className="input-label">Product Quantity</label>
                <input
                  className="double-input"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  type="number"
                  required
                />
              </div>
            </div>


              
            
            <div className="btn-area">
              <button disabled={loading} type="submit">
                {loading ? "Loading..." : "Edit Product"}
              </button>
            </div>
          </form>
        </div>
      );
}

export default EditProductModal
