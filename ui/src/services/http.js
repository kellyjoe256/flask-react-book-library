// @ts-nocheck
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, (error) => {
    const { response } = error;
    const { status: statusCode } = response;

    if (statusCode >= 400 && statusCode < 500) {
        const { data } = response;
        let message = data.error || data.message;

        // eslint-disable-next-line arrow-body-style
        const tokenExpired = ['token', 'expired'].every((w) => {
            return message.toLowerCase().includes(w);
        });
        // eslint-disable-next-line arrow-body-style
        const missingCookie = ['missing', 'cookie'].every((w) => {
            return message.toLowerCase().includes(w);
        });

        if (tokenExpired || missingCookie) {
            message = 'Session expired';
        }

        toast.error(message);
    }

    return Promise.reject(response);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    wrapper: axios,
};
