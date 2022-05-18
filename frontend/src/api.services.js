import axios from 'axios';
import { API_URL } from './config';

export const ApiService = {
  //auth
  registerStudent: data => {
    return axios.post(API_URL + 'auth/register/', data);
  },
  loginStudent: data => {
    return axios.post(API_URL + 'auth/login/', data);
  },
  loginPassword: data => {
    return axios.post(API_URL + 'auth/loginPassword/', data);
  },
  registerFaculty: data => {
    return axios.post(API_URL + 'auth/faculty/register/', data);
  },
  loginFaculty: data => {
    return axios.post(API_URL + 'auth/faculty/login/', data);
  },

  //api
  studentCourseList: token => {
    return axios.get(API_URL + `api/courseList/student/`, {
      headers: { auth_token: token },
    });
  },

  facultyCourseList: token => {
    return axios.get(API_URL + `api/courseList/faculty/`, {
      headers: { auth_token: token },
    });
  },

  searchStudent: data => {
    return axios.post(API_URL + 'api/searchStudent/', data);
  },

  CreateCourse: (data, token) => {
    return axios.post(API_URL + 'api/createCourse/', data, {
      headers: { auth_token: token },
    });
  },

  addStudent: data => {
    return axios.post(API_URL + 'api/addStudent/', data);
  },

  permission: (data, token) => {
    return axios.post(API_URL + 'api/requestPermission/', data, {
      headers: { auth_token: token },
    });
  },

  addClass: data => {
    return axios.post(API_URL + 'api/addClass/', data);
  },

  takeAttendance: data => {
    return axios.post(API_URL + 'api/attendance/', data);
  },

  getCourseDetails: id => {
    return axios.get(API_URL + `api/getCourseDetails/${id}`);
  },

  noOfClassesAttended: (data, token) => {
    return axios.post(API_URL + 'api/noOfClassesAttended/', data, {
      headers: { auth_token: token },
    });
  },
};
