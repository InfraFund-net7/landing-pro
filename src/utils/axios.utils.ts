import axios from "axios";
import { setupInterceptors } from "./interceptors.utils";

const _axios = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

setupInterceptors(_axios);

export default _axios;
