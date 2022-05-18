import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
//import Card from './components/Card';
import Student from './pages/StudentDashboard';
import FacultyRegister from './pages/FacultyRegisterPage';
import LoginPassword from './pages/LoginPasswordPage';
import CreateCourse from './pages/CreateCoursePage';
import AddStudent from './pages/AddStudent';
import StudentDashboard from './pages/StudentDashboard';
import Leave from './components/Leave';
import Class from './components/Class'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Student/>}></Route>
      <Route path="/createCourse" element={<CreateCourse/>}></Route>
      <Route path="/addStudent/:courseId" element={<AddStudent/>}></Route>
      <Route path="/login/password" element={<LoginPassword/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/student/register" element={<RegisterPage/>}></Route>
      <Route path="/faculty/register" element={<FacultyRegister/>}></Route>
      <Route path="/student/dashboard" element={<StudentDashboard/>}></Route>
      <Route path="/leave/:courseId" element={<Leave/>}></Route>
      <Route path="/createClass/:courseId" element={<Class/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
//faculty
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgzNTA5ZmEzOGNiN2NkN2JmZGZkMzgiLCJpZE5vIjoxMjM0NTYsImlhdCI6MTY1Mjc3MzA3NSwiZXhwIjoxNjUzMzc3ODc1fQ.1SsJfUhszr-U3t1up_Ld8AwiyzOC41IwolMWnJjg2N8

//student

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg0NDE3MTI3YmYzOWQ1MTU5YjVkNWUiLCJyb2xsTm8iOjEsImlhdCI6MTY1MjgzNDcwMywiZXhwIjoxNjUzNDM5NTAzfQ.8iG8vSrcIaq3_OOSQApRkVJxzrUZzhCqA5cFTaTwHrA