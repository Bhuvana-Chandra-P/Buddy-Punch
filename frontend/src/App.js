import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Student from './pages/StudentDashboard';
import FacultyRegister from './pages/FacultyRegisterPage';
import LoginPassword from './pages/LoginPasswordPage';
import CreateCourse from './pages/CreateCoursePage';
import AddStudent from './pages/AddStudent';
import StudentDashboard from './pages/StudentDashboard';
import Leave from './components/Leave';
import Class from './components/ScheduleClass';
import Attendance from './components/TakeAttendance';
import CourseDetailsStudent from './components/CourseDetailsStudent';
import FacultyDashboard from './pages/FacultyDashboard';
import CourseDetailsFaculty from './components/CourseDetailsFaculty';
import PermissionList from './components/PermissionList';
import ClassDetails from './components/ClassDetails';
import Monitor from './components/Monitor';
import MonitorDetails from './components/displayMonitoringDetails';
import Navbar from './components/navbar';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/createCourse" element={<CreateCourse />}></Route>
          <Route path="/addStudent/:courseId" element={<AddStudent />}></Route>
          <Route path="/login/password" element={<LoginPassword />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/student/register" element={<RegisterPage />}></Route>
          <Route path="/faculty/register" element={<FacultyRegister />}></Route>
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          ></Route>
          <Route
            path="/faculty/dashboard"
            element={<FacultyDashboard />}
          ></Route>
          <Route path="/leave/:courseId" element={<Leave />}></Route>
          <Route path="/createClass/:courseId" element={<Class />}></Route>
          <Route
            path="/takeAttendance/:classId"
            element={<Attendance />}
          ></Route>
          <Route
            path="/student/courseDetails/:courseId"
            element={<CourseDetailsStudent />}
          ></Route>
          <Route
            path="/faculty/courseDetails/:courseId"
            element={<CourseDetailsFaculty />}
          ></Route>
          <Route
            path="/faculty/permissionList/:courseId"
            element={<PermissionList />}
          ></Route>
          <Route
            path="/classDetails/:courseId/:classId"
            element={<ClassDetails />}
          ></Route>
          <Route path="/monitorClass/:classId" element={<Monitor />}></Route>
          <Route
            path="/monitorClassDetails/:classId"
            element={<MonitorDetails />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
