import React, { useEffect, useState } from "react";
import { PiCaretLeft, PiCaretRight, PiPen, PiPlus, PiTrash, PiXBold } from "react-icons/pi";
import Modal from "../Modal/Modal";
import AddProductModal from "./AddProductModal/AddProductModal";
import axios from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import EditProductModal from "./EditProductModal/EditProductModal";

const ProductDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { auth } = useAuth();
  const [modalType, setModalType] = useState('') 
  const [activeElement, setActiveElement] = useState() 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getAllProducts = () => {
    axios
      .get(`api/v1/product?page=${currentPage}&size=9`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const deleteProduct = (pId) => {
    setIsChanged(false);
    axios
      .delete(`api/v1/product/${pId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setIsChanged(true)
        toast.success('Product deleted succesfully!')
      })
      .catch((err) => {
        console.log(err);
        toast.error('An error occured!')
      });
  };



  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

  useEffect(() => {
    isChanged && getAllProducts();
  }, [isChanged]);



  return (
    <div>
      <div
        style={{
          marginLeft: "200px",
        }}
        className="navbar"
      >
        <p className="nav-heading">Products</p>
        <button onClick={()=>{
            setModalType('add')
            handleOpenModal()
        }} className="nav-button">
          <PiPlus />
          Add Product
        </button>
      </div>
      <div className="container">
        <div className="course-container">
          {products.map((product) => (
            <div className="course-card">
              <h3>{product.product_name + `(${product.quantity_in_stock})`}</h3>
              <p>${product.price}</p>
              <PiPen style={{
                right: '50px'
              }} onClick={()=>{
                setActiveElement(product)
                setModalType('edit')
                handleOpenModal()
              }} className="card-icon" />
              <PiTrash onClick={()=>deleteProduct(product.product_id)} className="card-icon" />
            </div>
          ))}
        </div>

        <div className="course-buttons">
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
            pointerEvents: products.length < 9 && "none",
            color: products.length < 9  && "#D7D7D9",
          }}
        >
          Next <PiCaretRight />
        </div>
      </div>
      </div>

      {isModalOpen && (
        <Modal>
          <div className="modal-header">
            <h2>{modalType[0].toUpperCase() + modalType.slice(1,)} Product</h2>
            <PiXBold className="close-btn" onClick={handleCloseModal} />
          </div>
          {
            modalType === 'add' ?          <AddProductModal
            closeModal={handleCloseModal}
            setIsChanged={setIsChanged}
          />
          : 
          <EditProductModal
          closeModal={handleCloseModal}
          setIsChanged={setIsChanged}
          activeElement={activeElement}
          />
          }
 
        </Modal>
      )}
    </div>
  );
};

export default ProductDashboard;
