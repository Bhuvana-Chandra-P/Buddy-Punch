import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';

export default function CreateCourse() {
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  let res;
  //let courseId;
  const addCourseHandler = async () => {
    setIsLoading(true);
    try {
      let data = {
        name: name,
        code: code,
      };
      let token = localStorage.getItem('Token');
      res = await ApiService.CreateCourse(data, token);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        navigate(`/addStudent/${res.data.id}`);
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

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Create course
        </Heading>

        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="code" isRequired>
          <FormLabel>Course Code</FormLabel>
          <Input
            placeholder="Course code"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </FormControl>

        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            isLoading={isLoading}
            onClick={() => addCourseHandler()}
          >
            Create course
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
