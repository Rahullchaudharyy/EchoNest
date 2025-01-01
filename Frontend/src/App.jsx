import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const App = () => {
// const dispatch = useDispatch()
//   const getProfile  = async () => {
//     try {
//       const response = await axios.get('/api/profile/view',{
//         withCredentials:true
//       })

//       if (response.status == 201) {
//         console.log('User response', response)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(() => {
//     getProfile()
//   }, [])
  
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default App