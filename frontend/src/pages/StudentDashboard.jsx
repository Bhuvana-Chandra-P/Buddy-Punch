import React, { useState, useEffect } from 'react';
import Card from '../components/StudentCourseCard';
//import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
import Navbar from '../components/navbar';
import {
  Flex,
  useColorModeValue,
  Center,
  useToast,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import dash from '../assests/dashboard.svg';
import { useNavigate } from 'react-router-dom';
function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('Token');
      let res = await ApiService.studentCourseList(token);
      console.log(res);
      setCourses(res.data.courseList);
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        toast({
          title: 'Error',
          description: `${err.response.data.message}`,
          status: 'warning',
          position: 'bottom-right',
          isClosable: true,
          duration: '5000',
        });
        if (err.status === 401 || err.status === 403) navigate('/login');
        return;
      }
    }
  };

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Flex
        //minH={'100vh'}
        // align={'center'}
        // justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        {courses.length > 0 && (
          <SimpleGrid columns={[1, 2, 3]}>
            {courses.map(course => (
              <>
                <Card course={course}></Card>
              </>
            ))}
          </SimpleGrid>
        )}
      </Flex>

      {courses.length === 0 && (
        <Center>
          <Image w="100%" h="400px" src={dash} />
        </Center>
      )}
    </>
  );
}
export default StudentDashboard;
