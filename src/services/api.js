import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "https://tutorial-blog-app-backend.onrender.com",
    withCredentials: true
})

api.interceptors.request.use(config => {
    const csrf = Cookies.get("csrf_access_token")
    if(csrf) {
        config.headers["X-CSRF-TOKEN"] = csrf
    }
    return config;
})