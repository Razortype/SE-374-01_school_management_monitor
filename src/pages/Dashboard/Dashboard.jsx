import { useState } from 'react'
import Navbar from '../../components/CommonComponents/Navbar/Navbar'
import Sidebar from '../../components/CommonComponents/Sidebar/Sidebar'
import StudentDashboard from '../../components/StudentDashboard/StudentDashboard'
import './Dashboard.css'
import useActiveTab from '../../hooks/useActiveTab'
import TeacherDashboard from '../../components/TeacherDashboard/TeacherDashboard'
import CourseDashboard from '../../components/CourseDashboard/CourseDashboard'
import ClassDashboard from '../../components/ClassDashboard/ClassDashboard'

const Dashboard = () => {
  const { activeTab, setActiveTab } = useActiveTab();
  const [isChanged, setIsChanged] = useState(false);

  return (
    <div className=''>
      <Sidebar/>
      <Navbar setIsChanged={setIsChanged}/>
      {
        activeTab === "students" ? 
        <StudentDashboard isChanged={isChanged}/>
        : activeTab === "teachers" ? <TeacherDashboard isChanged={isChanged}/>
        : activeTab === "course" ? <CourseDashboard isChanged={isChanged} />
        : activeTab === "classes" ? <ClassDashboard isChanged={isChanged} />
        : "BLANK PAGE"
      }
    </div>
  )
}

export default Dashboard
