import axios from 'axios';
import { getToken } from '../services/token-service';

const axiosClient = axios.create({
    baseURL: `http://localhost:2000`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
});

export default axiosClient;