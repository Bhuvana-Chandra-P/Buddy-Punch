import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../api.services';

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
} from '@chakra-ui/react';

const CourseDetails = () => {
  //const toast = useToast();
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
  //console.log(courseId);
  let ctr = 1;
  const fetchCourse = async () => {
    let token = localStorage.getItem('Token');
    let res = await ApiService.getCourseDetails(courseId, token);
    let res1 = await ApiService.courseAttendance(courseId);
    console.log(res);
    console.log(res1);
    console.log(res1.data.result);
    setName(res.data.course.name);
    setCode(res.data.course.code);
    setFacultyName(res.data.course.faculty.name);
    setNoOfStudents(res.data.course.students.length);
    setNoOfClasses(res.data.course.classes.length);
    //setStudents(res.data.course.students);
    setClasses(res.data.course.classes);
    setdateAndTime(res.data.dateAndTime);
    setAttendance(res1.data.result);

    return;
  };
  const takeAttendanceHandler = async id => {
    console.log(id);
    navigate(`/classDetails/${courseId}/${id}`);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
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
          </Stack>

          <Stack align={'center'} p={5} fontSize={'xl'}>
            <Text>Classes</Text>
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
          </TableContainer>
          <Stack align={'center'} p={5} fontSize={'xl'}>
            <Text>Attendance</Text>
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
          </TableContainer>
        </Box>
      </Center>
    </>
  );
};
export default CourseDetails;
