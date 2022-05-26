import React, { useState } from 'react';

import {
  Button,
  Flex,
  Stack,
  useColorModeValue,
  useToast,
  Text,
  Center,
} from '@chakra-ui/react';

import { ApiService } from '../api.services';
const Student = ({ student, courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  //const navigate = useNavigate();
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
      let token = localStorage.getItem("Token");
      res = await ApiService.addStudent(data,token);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        window.location.reload(false);
        return;
      }
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
  const { _id, rollNo, name } = student;
  console.log(_id, rollNo);
  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
      >
        <Stack direction={['column', 'row']} spacing={6}>
          <Center w="full">
            <Text>Roll Number : {rollNo}</Text>
          </Center>
          <Center w="full">
            <Text>Name : {name}</Text>
          </Center>
        </Stack>

        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            // bg={'blue.400'}
            // color={'white'}
            colorScheme="whatsapp"
            w="full"
            isLoading={isLoading}
            onClick={() => addStudentHandler()}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Add student
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
export default Student;
