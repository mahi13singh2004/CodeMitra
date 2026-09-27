import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL || (
    import.meta.env.PROD
        ? "https://codemitra-backend-6poe.onrender.com/api"
        : "http://localhost:5000/api"
)

const api = axios.create({
    baseURL,
    withCredentials: true,
})

export default api
