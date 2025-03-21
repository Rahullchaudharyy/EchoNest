import axios from 'axios'

// for the development


// const axiosInstence = axios.create({
//     baseURL: '/api',
//     withCredentials: true
// })
const axiosInstence = axios.create({
    baseURL: 'https://echonest.onrender.com',
    withCredentials: true
})


axiosInstence.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default axiosInstence