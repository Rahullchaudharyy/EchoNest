import axios from 'axios'


const axiosInstence = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials:true
})
// const axiosInstence = axios.create({
//     baseURL:"https://echonest.onrender.com",
//     withCredentials:true
// })

export default axiosInstence