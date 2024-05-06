import React from 'react'
import './Sidebar.css';
import Logo from '../../../assets/Group.png';
import { PiUsers, PiNotification, PiBell } from "react-icons/pi";
import useActiveTab from '../../../hooks/useActiveTab';
import { NAV_ITEMS } from '../../../data';
const Sidebar = () => {
  const { activeTab, setActiveTab } = useActiveTab();
  return (
    <div className='sidebar'>
      <div className='logo-container'>
          <img src={Logo} className='sidebar-img'/>
          <p>logo</p>
      </div>
      <ul className='nav-list'>
        {
          NAV_ITEMS.map(({name, Icon, href})=>(
          <li onClick={()=>setActiveTab(href)} className={`${href === activeTab && 'active-tab'}`}>
            <Icon/>
            <p>{name}</p>
          </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar
