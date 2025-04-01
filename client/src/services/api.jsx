import axios from 'axios';

export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Example usage:
// api.get('/events').then(response => console.log(response.data));
