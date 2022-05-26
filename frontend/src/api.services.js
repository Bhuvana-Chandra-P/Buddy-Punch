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

  searchStudent: (data,token) => {
    return axios.post(API_URL + 'api/searchStudent/', data,{
      headers: { auth_token: token },
    });
  },

  CreateCourse: (data, token) => {
    return axios.post(API_URL + 'api/createCourse/', data, {
      headers: { auth_token: token },
    });
  },

  addStudent: (data,token) => {
    return axios.post(API_URL + 'api/addStudent/', data,{
      headers: { auth_token: token },
    });
  },

  permission: (data, token) => {
    return axios.post(API_URL + 'api/requestPermission/', data, {
      headers: { auth_token: token },
    });
  },

  addClass: (data,token) => {
    return axios.post(API_URL + 'api/addClass/', data,{
      headers: { auth_token: token },
    });
  },

  takeAttendance: (data,token) => {
    return axios.post(API_URL + 'api/attendance/', data,{
      headers: { auth_token: token },
    });
  },

  getCourseDetails: (id,token) => {
    return axios.get(API_URL + `api/getCourseDetails/${id}`,{
      headers: { auth_token: token },
    });
  },

  noOfClassesAttended: (data, token) => {
    return axios.post(API_URL + 'api/noOfClassesAttended/', data, {
      headers: { auth_token: token },
    });
  },

  permissionList: id => {
    return axios.get(API_URL + `api/permissionList/${id}`);
  },

  acceptPermission: id => {
    return axios.get(API_URL + `api/permission/accept/${id}`);
  },

  rejectPermission: id => {
    return axios.get(API_URL + `api/permission/reject/${id}`);
  },

  courseAttendance: id => {
    return axios.get(API_URL + `api/courseAttendanceReport/${id}`);
  },

  attendance: (data) => {
    return axios.post(API_URL + `api/attendanceReport`,data);
  },

  monitor: (data,token) => {
    return axios.post(API_URL + 'api/monitorClass/', data,{
      headers: { auth_token: token },
    });
  },

  displayMonitorDetails: id => {
    return axios.get(API_URL + `api/monitorClassDetails/${id}/`);
  },

  getUserName: (token) => {
    return axios.get(API_URL + 'api/getUserName/',  {
      headers: { auth_token: token },
    });
  },
};
