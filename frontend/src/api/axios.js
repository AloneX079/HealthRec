import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://healthrec.unstablehosting.co.in:25590/api/v1',
    headers: {
        'Content-Type': 'application/json',
    }
});