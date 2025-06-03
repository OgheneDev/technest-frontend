import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://technest-ohai.onrender.com',
    timeout: 1000000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default axiosInstance;