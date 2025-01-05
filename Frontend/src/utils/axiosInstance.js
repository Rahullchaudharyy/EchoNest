import axios from 'axios'


const axiosInstence = axios.create({
    baseURL:"https://echonest.onrender.com",
    withCredentials:true
})

export default axiosInstence