// @ts-nocheck
import axios from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, (error) => {
    const { response } = error;
    const { status: statusCode } = response;

    let message = null;
    if (statusCode >= 400 && statusCode < 500) {
        const { data } = response;
        if (data.error || data.message) {
            message = data.message || data.error;
        }

        if (!message) {
            message = response.statusText;
        }

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
    } else {
        message = 'An unexpected error occurred';
    }

    toast.error(_.capitalize(message));

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
