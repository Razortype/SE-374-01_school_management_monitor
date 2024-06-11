import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../services/api";
import { PiPlus } from "react-icons/pi";
import { st } from "./data";
import { toast } from "react-toastify";
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';

const Basket = () => {
  const [products, setProducts] = useState([]);
  const data = st;
  const [formData, setFormData] = useState({
    productId: "",
    studentId: "",
    boughtQuantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { auth } = useAuth();

  const handleOpenModal = () => {
    fetchTransactions();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getAllProducts = () => {
    axios
      .get(`api/v1/product?page=0&size=100`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTransactions = () => {
    axios
      .get(`/api/v1/transaction?page=-1&size=-1`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(async (response) => {
        const transactions = response.data.data;
        const json = JSON.stringify(transactions, null, 2);
        const encoder = new TextEncoder();
        const data = encoder.encode(json);

        try {
          await writeBinaryFile({
            path: "transactions.json",
            contents: data,
          }, { dir: BaseDirectory.Desktop });

          toast.success("Transactions downloaded successfully");
        } catch (err) {
          console.error(err);
          toast.error("Failed to save the transactions.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch transactions.");
      });
  };

  const purchase = (e) => {
    e.preventDefault();

    if (formData.productId === "") {
      toast.error("Please select a product.");
      return;
    }
    if (formData.studentId === "") {
      toast.error("Please select a student.");
      return;
    }
    if (formData.boughtQuantity === "0") {
      toast.error("Please enter a quantity.");
      return;
    }

    setLoading(true);

    axios
      .post(
        `/api/v1/transaction/purchase`,
        {
          product_id: formData.productId,
          student_id: formData.studentId,
          bought_quantity: formData.boughtQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success("Purchased successfully");
        setLoading(false);
        setFormData({
          productId: "",
          studentId: "",
          boughtQuantity: "",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
        setFormData({
          productId: "",
          studentId: "",
          boughtQuantity: "",
        });
        console.log(err);
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
    getAllProducts();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <div
        style={{
          marginLeft: "200px",
        }}
        className="navbar"
      >
        <p className="nav-heading">Purchase</p>
        <button
          onClick={() => {
            handleOpenModal();
          }}
          className="nav-button"
        >
          Get Transactions
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
        className="container"
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "30px",
            justifyContent: "start",
            border: "2px solid rgba(202,239,249,1)",
            padding: "10px 20px",
            borderRadius: "10px",
            width: "300px",
          }}
          onSubmit={purchase}
        >
          <h4
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Purchase
          </h4>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
            }}
            className="course-area"
          >
            <select
              className="course-modal-input"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              type="text"
              required
              style={{
                width: "100%",
                border: "2px solid rgba(202,239,249,1)",
              }}
            >
              <option value="">Select a Student</option>
              {data?.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstname} {student.lastname}
                </option>
              ))}
            </select>

            <select
              className="course-modal-input"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              type="text"
              required
              style={{
                width: "100%",
                border: "2px solid rgba(202,239,249,1)",
              }}
            >
              <option value="">Select a Product</option>
              {products?.map((product) => (
                <option key={product.product_id} value={product.product_id}>
                  {product.product_name}
                </option>
              ))}
            </select>

            <input
              className="course-modal-input"
              name="boughtQuantity"
              value={formData.boughtQuantity}
              onChange={handleChange}
              type="number"
              required
              min={0}
              style={{
                width: "100%",
                border: "2px solid rgba(202,239,249,1)",
              }}
              placeholder="Quantity"
            />

            <div className="btn-area">
              <button
                onClick={purchase}
                style={{
                  backgroundColor: "rgba(202,239,249,1)",
                  color: "black",
                  fontWeight: "bold",
                }}
                type="submit"
              >
                Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Basket;
