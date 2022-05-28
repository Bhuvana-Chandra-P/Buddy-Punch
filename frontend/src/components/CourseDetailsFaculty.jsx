import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../api.services';
import Navbar from './navbar';
import {
  Text,
  useColorModeValue,
  Stack,
  Box,
  Heading,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Image,
} from '@chakra-ui/react';
import details from '../assests/classDetails.svg';
const CourseDetails = () => {
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [facultyName, setFacultyName] = useState();
  const [noOfStudents, setNoOfStudents] = useState();
  const [noOfClasses, setNoOfClasses] = useState();
  //const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [dateAndTime, setdateAndTime] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  //console.log(courseId);
  let ctr = 1;
  const fetchCourse = async () => {
    try {
      let token = localStorage.getItem('Token');
      let res = await ApiService.getCourseDetails(courseId, token);
      let res1 = await ApiService.courseAttendance(courseId);
      console.log(res);
      console.log(res1);
      console.log(res1.data.result);
      setName(res.data.course.name);
      setFacultyName(res.data.course.faculty.name);
      setNoOfStudents(res.data.course.students.length);
      setNoOfClasses(res.data.course.classes.length);
      //setStudents(res.data.course.students);
      setClasses(res.data.course.classes);
      setdateAndTime(res.data.dateAndTime);
      setAttendance(res1.data.result);
      setCode(res.data.course.code);

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
  };
  const takeAttendanceHandler = async id => {
    console.log(id);
    navigate(`/classDetails/${courseId}/${id}`);
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
          {code === '' && (
            <Center>
              <Image w="100%" h="400px" src={details} />
            </Center>
          )}
          {code !== '' && (
            <>
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
              </Stack>

              <Stack align={'center'} p={5} fontSize={'18px'}>
                <Text>Classes (click on classes to view more details)</Text>
              </Stack>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Class No</Th>
                      <Th>Date</Th>
                      <Th isNumeric>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dateAndTime.length > 0 && (
                      <>
                        {dateAndTime.map((dAndT, index) => (
                          <>
                            <Tr
                              onClick={() =>
                                takeAttendanceHandler(classes[index]._id)
                              }
                            >
                              <Td>{ctr++}</Td>
                              <Td>{dAndT.date}</Td>
                              <Td isNumeric>{dAndT.time}</Td>
                            </Tr>
                          </>
                        ))}
                      </>
                    )}
                  </Tbody>
                </Table>
                {dateAndTime.length === 0 && (
                  <Center>
                    <Text>No Class Found</Text>
                  </Center>
                )}
              </TableContainer>
              <Stack align={'center'} p={5} fontSize={'18px'}>
                <Text>Students</Text>
              </Stack>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Roll No</Th>
                      <Th isNumeric>No of classes Present</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {attendance.length > 0 && (
                      <>
                        {attendance.map(at => (
                          <>
                            <Tr>
                              <Td>{at.name}</Td>
                              <Td>{at.rollNo}</Td>
                              <Td isNumeric>{at.noOfClassesPresent}</Td>
                            </Tr>
                          </>
                        ))}
                      </>
                    )}
                  </Tbody>
                </Table>
                {attendance.length === 0 && (
                  <Center>
                    <Text>No Student Found</Text>
                  </Center>
                )}
              </TableContainer>
            </>
          )}
        </Box>
      </Center>
    </>
  );
};
export default CourseDetails;
