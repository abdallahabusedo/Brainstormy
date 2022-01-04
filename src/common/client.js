import axios from 'axios';
import { getToken } from '../services/token-service';

const axiosClient = axios.create({
	baseURL: `http://4dfc-196-132-45-216.ngrok.io`,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${getToken()}`,
	},
});

export default axiosClient;
