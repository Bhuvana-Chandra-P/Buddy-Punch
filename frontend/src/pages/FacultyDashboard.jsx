import React, { useState, useEffect } from 'react';
import Card from '../components/FacultyCourseCard';
//import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
import dash from '../assests/dashboard.svg';
import {
  Button,
  Flex,
  useColorModeValue,
  GridItem,
  VStack,
  Box,
  Grid,
  Divider,
  chakra,
  Text,
  Center,
  useToast,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
function FacultyDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('Token');
      console.log(token);
      let res = await ApiService.facultyCourseList(token);
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
        else navigate('/faculty/dashboard');
        return;
      }
    }

    // setCourses(courses);
  };

  const createCourseHandler = async () => {
    navigate('/createCourse');
  };

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Box maxW="7xl" mt={14} p={4}>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={4}
        >
          <GridItem colSpan={1}>
            <VStack alignItems="flex-start" spacing="20px">
              <chakra.h2 fontSize="3xl" fontWeight="700">
                Hello!!!
              </chakra.h2>
              <Button
                colorScheme="green"
                size="md"
                onClick={createCourseHandler}
              >
                Create Course
              </Button>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex>
              <chakra.p>
                Create courses, Add students, Schedule classes, Take attendance,
                Monitor class .
              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{ base: '8', sm: '12', md: '16' }}
        ></Grid>
      </Box>
      <Flex
        //minH={'100vh'}
        // align={'center'}
        // justify={'center'}
        w="100%"
        d="flex"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        {courses.length > 0 && (
          <SimpleGrid columns={[1, 2, 3, 4]}>
            {courses.map(course => (
              // <SimpleGrid columns={3} spacing={5}>
              <Card course={course}></Card>
              // </SimpleGrid>
            ))}
          </SimpleGrid>
        )}
      </Flex>
      <Center>
        <Image w="480px" src={dash} />
      </Center>
      {courses.length === 0 && (
        <Center>
          <Text>No Course Found</Text>
        </Center>
      )}
    </>
  );
}
export default FacultyDashboard;
