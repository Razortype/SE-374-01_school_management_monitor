import React, { useEffect, useState } from "react";
import useActiveTab from "../../hooks/useActiveTab";
import Logo from "../../assets/Group.png";
import { FaBox, FaShoppingBasket } from "react-icons/fa";
import ProductDashboard from "../../components/ProductDashboard/ProductDashboard";

const CanteenDashboard = () => {
  const { activeTab, setActiveTab } = useActiveTab();
  const [isChanged, setIsChanged] = useState();

  useEffect(() => {
    setActiveTab("products");
  }, []);
  return (
    <div className="">
      <div className="sidebar">
        <div className="logo-container">
          <img src={Logo} className="sidebar-img" />
          <p>logo</p>
        </div>
        <ul className="nav-list">
          <li
            onClick={() => setActiveTab("products")}
            className={`${"products" === activeTab && "active-tab"}`}
          >
            <FaBox />
            <p>Products</p>
          </li>
          <li
            onClick={() => setActiveTab("purchase")}
            className={`${"purchase" === activeTab && "active-tab"}`}
          >
            <FaShoppingBasket />
            <p>Purchase</p>
          </li>
        </ul>
      </div>



        {activeTab === "products"
          ? <ProductDashboard/>
          : activeTab === "purchase"
          ? "basket"
          : ""}
    </div>
  );
};

export default CanteenDashboard;
