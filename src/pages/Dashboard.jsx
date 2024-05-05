import axios from 'axios'
import React from 'react'

const Dashboard = () => {


  const makeRequest = () => {
     axios.get('https://fakestoreapi.com/products/1')
     .then(res=>console.log(res.data))
     .catch(err=>console.log(err))
  }
  return (
    <div style={{
        width:'100%',
        height:'100%',
        color:'black'
    }}>
      <button onClick={makeRequest}>
        Let's try to make same axios requests
      </button>
    </div>
  )
}

export default Dashboard
