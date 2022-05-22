import React, { useState, useEffect } from 'react';
import Card from '../components/FacultyCourseCard';
//import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
function FacultyDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const fetchCourse = async () => {
    const token = localStorage.getItem('Token');
    let res = await ApiService.facultyCourseList(token);
    console.log(res);
    setCourses(res.data.courseList);
    // setCourses(courses);
  };

  const createCourseHandler = async () => {
    navigate('/createCourse');
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
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
                Create courses, Add students, schedule classes, take attendance,
                monitor class .
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
export default FacultyDashboard;
