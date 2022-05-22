import React, { useState } from 'react';
import Webcam from 'react-webcam';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: 'user',
};
export default function FacultyRegister() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [idNo, setIdNo] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [image] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const webcamRef = React.useRef(null);

  let imageSrc;

  const registerHandler = async () => {
    setIsLoading(true);
    try {
      imageSrc = webcamRef.current.getScreenshot();
      const image = JSON.stringify(imageSrc);
      let data = {
        image: image,
        name: name,
        mobileNo: mobileNo,
        email: email,
        password: password,
        idNo: idNo,
      };
      const res = await ApiService.registerFaculty(data);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        toast({
          title: 'Success',
          description: `${res.data.message}`,
          status: 'success',
          position: 'bottom-right',
          isClosable: true,
          duration: '5000',
        });
        navigate('/login');
        return;
      }
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        setIsLoading(false);
        toast({
          title: 'Error',
          description: `${err.response.data.message}`,
          status: 'error',
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
          Faculty SignUp
        </Heading>
        <FormControl id="userName">
          <Center>{/* <FormLabel>Image</FormLabel> */}</Center>
          <Center>
            <div className="webcam-img">
              {image === '' ? (
                <Webcam
                  audio={false}
                  height={200}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={220}
                  videoConstraints={videoConstraints}
                />
              ) : (
                <img src={image} alt="user-img" />
              )}
            </div>
          </Center>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="idNo" isRequired>
          <FormLabel>ID Number</FormLabel>
          <Input
            placeholder="Roll Number"
            _placeholder={{ color: 'gray.500' }}
            type="number"
            value={idNo}
            onChange={e => setIdNo(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="mobileNo" isRequired>
          <FormLabel>Mobile Number</FormLabel>
          <Input
            placeholder="Mobile Number"
            _placeholder={{ color: 'gray.500' }}
            type="number"
            value={mobileNo}
            onChange={e => setMobileNo(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
            onClick={() => registerHandler()}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
