import React, { useState } from 'react';

import {
  Button,
  Flex,
  Stack,
  useColorModeValue,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
const Student = ({ student, courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  let res;
  let studentId = student._id;
  console.log('course', courseId);

  const addStudentHandler = async () => {
    setIsLoading(true);
    try {
      let data = {
        courseId: courseId,
        studentId: studentId,
      };
      res = await ApiService.addStudent(data);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        navigate(`/addStudent/${res.data.id}`);
        return;
      }
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 400) {
          setIsLoading(false);
          toast({
            title: 'User already exists',
            description: 'User with same roll number already exixts',
            status: 'warning',
            position: 'bottom-right',
            isClosable: true,
            duration: '5000',
          });
          return;
        }
      }
    }
  };
  const { _id, rollNo } = student;
  console.log(_id, rollNo);
  return (
    <Flex
      minH={'10vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Text>Roll Number : {rollNo}</Text>
      <Stack spacing={6} direction={['column', 'row']}>
        <Button
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }}
          isLoading={isLoading}
          onClick={() => addStudentHandler()}
        >
          Add student
        </Button>
      </Stack>
    </Flex>
  );
};
export default Student;
