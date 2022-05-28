import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../api.services';
import Navbar from './navbar';
import {
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Heading,
  Center,
  Box,
  useToast,
} from '@chakra-ui/react';

const CourseDetails = () => {
  const toast = useToast();
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [facultyName, setFacultyName] = useState();
  const [noOfStudents, setNoOfStudents] = useState();
  const [noOfClasses, setNoOfClasses] = useState();
  const [noOfClassesPresent, setNoOfClassesPresent] = useState();
  const [students, setStudents] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const { courseId } = useParams();
  console.log(courseId);

  const fetchCourse = async () => {
    try {
      let token = localStorage.getItem('Token');
      let res = await ApiService.getCourseDetails(courseId, token);
      console.log(res);
      let data = {
        courseId: courseId,
      };

      let result = await ApiService.noOfClassesAttended(data, token);
      setName(res.data.course.name);
      setCode(res.data.course.code);
      setFacultyName(res.data.course.faculty.name);
      setNoOfStudents(res.data.course.students.length);
      setNoOfClasses(res.data.course.classes.length);
      setStudents(res.data.course.students);
      setNoOfClassesPresent(result.data.noOfClassesPresent);
      setPermissions(res.data.permissions);
      console.log(result);
      return;
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
        return;
      }
    }

    // setCourses(courses);
  };

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'700px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'4xl'}
              textTransform={'uppercase'}
            >
              {name}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              <Text>Subject Code : {code}</Text>
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text>Faculty Name : {facultyName}</Text>
              <Text>Number of Students : {noOfStudents}</Text>
              <Text>Number of Classes : {noOfClasses}</Text>
            </Stack>
            <Text>Number of Classes Present : {noOfClassesPresent}</Text>
          </Stack>

          <Stack align={'center'} p={5} fontSize={'xl'}>
            <Text>Students</Text>
          </Stack>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>

                  <Th isNumeric>Roll No</Th>
                </Tr>
              </Thead>
              <Tbody>
                {students.length > 0 && (
                  <>
                    {students.map(student => (
                      <>
                        <Tr>
                          <Td>{student.name}</Td>

                          <Td isNumeric>{student.rollNo}</Td>
                        </Tr>
                      </>
                    ))}
                  </>
                )}
              </Tbody>
            </Table>
          </TableContainer>

          <Stack align={'center'} p={5} fontSize={'xl'}>
            <Text>Permissions</Text>
          </Stack>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Subject</Th>

                  <Th isNumeric>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {permissions.length > 0 && (
                  <>
                    {permissions.map(permission => (
                      <>
                        <Tr>
                          <Td>{permission.subject}</Td>

                          <Td isNumeric>{permission.status}</Td>
                        </Tr>
                      </>
                    ))}
                  </>
                )}
              </Tbody>
            </Table>
            {/* {permissions.length === 0 && (
              <Center>
                <Text>No Permissions submitted</Text>
              </Center>
            )} */}
          </TableContainer>
        </Box>
      </Center>
    </>
  );
};
export default CourseDetails;
