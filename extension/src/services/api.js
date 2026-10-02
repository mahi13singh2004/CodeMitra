import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL || (
    import.meta.env.PROD
        ? "https://codemitra-backend-6poe.onrender.com/api"
        : "http://localhost:5000/api"
)

const api = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 90000,
})

api.interceptors.request.use((config) => {
    config.metadata = { startTime: new Date() }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            error.message = 'Server is waking up (free tier). Please try again in a moment.'
        }
        return Promise.reject(error)
    }
)

export default api
