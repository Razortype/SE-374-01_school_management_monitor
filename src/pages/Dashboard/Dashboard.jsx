import Navbar from '../../components/CommonComponents/Navbar/Navbar'
import Sidebar from '../../components/CommonComponents/Sidebar/Sidebar'
import StudentDashboard from '../../components/StudentDashboard/StudentDashboard'
import './Dashboard.css'

const Dashboard = () => {
  const makeRequest = () => {
     axios.get('https://fakestoreapi.com/products/1')
     .then(res=>console.log(res.data))
     .catch(err=>console.log(err))
  }
  return (
    <div className=''>
      <Sidebar/>
      <Navbar/>
      <StudentDashboard/>
    </div>
  )
}

export default Dashboard
