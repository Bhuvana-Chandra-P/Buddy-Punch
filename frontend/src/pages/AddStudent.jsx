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
import { useParams } from 'react-router-dom';
import { ApiService } from '../api.services';
import Student from '../components/Student';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { courseId } = useParams();
  const toast = useToast();
  let res = [];

  console.log('courseId', courseId);

  const searchHandler = async () => {
    //setIsLoading(true);
    try {
      let data = {
        name: name,
      };
      console.log(name);
      res = await ApiService.searchStudent(data);
      console.log(res);
      if (res.status === 200) {
        setResult(res.data.studentList);
        setIsSearching(true);
        return;
      }
    } catch (err) {
      console.log(err.message);
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
            //onInput={searchHandler}
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
            onClick={() => searchHandler()}
          >
            search
          </Button>
        </Stack>

        {isSearching ? (
          <>
            {result.map(student => (
              <>
                <Student
                  student={student}
                  key={student._id}
                  courseId={courseId}
                />
                {/* <Button onClick = {removeHandler({student})}>remove</Button> */}
              </>
            ))}
          </>
        ) : (
          ''
        )}
      </Stack>
    </Flex>
  );
}
