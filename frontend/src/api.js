import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true // sends/receives the JWT cookie
});

export default api;
