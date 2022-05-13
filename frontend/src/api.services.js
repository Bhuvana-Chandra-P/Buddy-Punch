import axios from 'axios';
import { API_URL } from './config';

export const ApiService = {
  registerStudent: data => {
    return axios.post(API_URL + 'auth/register/', data);
  },
  loginStudent: data => {
    return axios.post(API_URL + 'auth/login/', data);
  },
};
