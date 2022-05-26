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
import Navbar from '../components/navbar';
export default function LoginPassword() {
  const [password, setPassword] = useState();
  const [number, setNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      let data = {
        number: number,
        password: password,
      };
      const res = await ApiService.loginPassword(data);
      console.log(res);
      if (res.status === 200) {
        const Token = res.data.token;
        localStorage.setItem('Token', Token);

        setIsLoading(false);
        if (res.data.isFaculty) {
          toast({
            title: 'Login successful',
            description: 'user logedin successfully',
            status: 'success',
            position: 'bottom-right',
            isClosable: true,
            duration: '5000',
          });
          localStorage.setItem('Faculty', 'true');
          navigate('/faculty/dashboard');
          window.location.reload(false);
        } else {
          toast({
            title: 'Login successful',
            description: 'user logedin successfully',
            status: 'success',
            position: 'bottom-right',
            isClosable: true,
            duration: '5000',
          });
          localStorage.setItem('Faculty', 'false');
          navigate('/student/dashboard');
          window.location.reload(false);
        }
        return;
      }
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        setIsLoading(false);
        toast({
          title: 'Login not successful',
          description: 'No person found',
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
    <>
      <Navbar></Navbar>
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
            Login with password
          </Heading>

          <FormControl id="number" isRequired>
            <FormLabel>Roll Number/Id Number</FormLabel>
            <Input
              placeholder="Roll Number/Id Number"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              value={number}
              onChange={e => setNumber(e.target.value)}
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
              onClick={() => loginHandler()}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
