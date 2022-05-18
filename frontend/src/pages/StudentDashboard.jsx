import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
//import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
// import {
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   useColorModeValue,
//   useToast,
//   Link
// } from '@chakra-ui/react';
function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const fetchCourse = async () => {
    const token = localStorage.getItem('Token');
    let res = await ApiService.studentCourseList(token);
    console.log(res);
    setCourses(res.data.courseList);
    // setCourses(courses);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      {courses.length > 0 && (
        <>
          {courses.map(course => (
            <>
              <Card course={course}></Card>
            </>
          ))}
        </>
      )}
    </>
  );
}
export default StudentDashboard;
