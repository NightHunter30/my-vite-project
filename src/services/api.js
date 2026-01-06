import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

api.interceptors.request.use(config => {
    const csrf = Cookies.get("csrf_access_token")
    if(csrf) {
        config.headers["X-CSRF-TOKEN"] = csrf
    }
    return config;
})