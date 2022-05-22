import React, { useState, useEffect } from 'react';
import Card from '../components/StudentCourseCard';
//import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
import { Flex, useColorModeValue, Center, Text } from '@chakra-ui/react';
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
      <Flex
        //minH={'100vh'}
        // align={'center'}
        // justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        {courses.length > 0 && (
          <>
            {courses.map(course => (
              <>
                <Card course={course}></Card>
              </>
            ))}
          </>
        )}
      </Flex>

      {courses.length === 0 && (
        <Center>
          <Text>No Course Found</Text>
        </Center>
      )}
    </>
  );
}
export default StudentDashboard;
