import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../api.services';

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
  Center,
  Box,
  Button,
} from '@chakra-ui/react';

const CourseDetails = () => {
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const { courseId, classId } = useParams();
  const navigate = useNavigate();
  const fetchCourse = async () => {
    let data = {
      courseId: courseId,
      classId: classId,
    };
    let res = await ApiService.attendance(data);
    console.log(res);
    console.log(res.data.result[0].present);
    console.log(res.data.result[1].absent);
    setPresent(res.data.result[0].present);
    setAbsent(res.data.result[1].absent);

    //return;
  };
  const takeAttendanceHandler = () => {
    navigate(`/takeAttendance/${classId}`);
  };

  const monitorClassDetailsHandler = () => {
    navigate(`/monitorClassDetails/${classId}`);
  };

  const monitorHandler = () => {
    navigate(`/monitorClass/${classId}`);
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
          <Stack align={'center'} p={5} fontSize={'xl'}>
            <Text>Prsent</Text>
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
                {present.length > 0 && (
                  <>
                    {present.map(student => (
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
            <Text>Absent</Text>
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
                {absent.length > 0 && (
                  <>
                    {absent.map(student => (
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
          <Center>
            <Button onClick={takeAttendanceHandler} m={5}>
              Take attendance
            </Button>
            <Button onClick={monitorHandler} m={5}>
              Monitor Class
            </Button>
            <Button onClick={monitorClassDetailsHandler} m={5}>
              Monitor Class Details
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
};
export default CourseDetails;