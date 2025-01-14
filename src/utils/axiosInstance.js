import axios from 'axios'

// for the development


const axiosInstence = axios.create({
    baseURL: '/api',
    withCredentials:true
})


// const axiosInstence = axios.create({
//     baseURL: 'http://localhost:3000',
//     withCredentials:true
// })
// for the production 
// const axiosInstence = axios.create({
//     baseURL:"https://echonest.onrender.com",
//     withCredentials:true
// })

export default axiosInstence