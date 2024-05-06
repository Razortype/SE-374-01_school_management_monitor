import React from 'react';
import './Navbar.css';
import useActiveTab from '../../../hooks/useActiveTab';
import { PiPlus } from "react-icons/pi";

const Navbar = () => {
  const {activeTab, setActiveTab} = useActiveTab();
  return (
    <div className='navbar' style={{
      marginLeft: '200px'
    }}>
      <p className='nav-heading'>{activeTab[0]?.toUpperCase() + activeTab?.slice(1,)}</p>
      <button className='nav-button'>
        <PiPlus/>
        Add Student
      </button>
    </div>
  )
}

export default Navbar
