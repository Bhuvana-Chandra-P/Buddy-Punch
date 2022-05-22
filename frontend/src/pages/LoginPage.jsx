import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';
import {
  Button,
  Flex,
  FormControl,
  Stack,
  useColorModeValue,
  Center,
  useToast,
  Text
} from '@chakra-ui/react';
const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: 'user',
};

function LoginPage() {
  const [image] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const webcamRef = React.useRef(null);

  let imageSrc;
  const facultyRegisterHandler = async () => {
    navigate('/faculty/register')
  }
  const studentRegisterHandler = async () => {
    navigate('/student/register')
  }
  const loginHandler = async () => {
    setIsLoading(true);
    try {
      imageSrc = webcamRef.current.getScreenshot();
      const image = JSON.stringify(imageSrc);
      let data = { image: image };
      const res = await ApiService.loginStudent(data);
      console.log(res);
      if (res.status === 200) {
        const Token = res.data.token;
        localStorage.setItem('Token', Token);
        
        setIsLoading(false);
        if(res.data.isFaculty)
        {
          toast({
            title: 'Login successful',
            description: 'user logedin successfully',
            status: 'success',
            position: 'bottom-right',
            isClosable: true,
            duration: '5000',
          });
          localStorage.setItem('Faculty',"true");
          navigate('/faculty/dashboard')
          window.location.reload(false);
        }
        else{
          toast({
            title: 'Login successful',
            description: 'user logedin successfully',
            status: 'success',
            position: 'bottom-right',
            isClosable: true,
            duration: '5000',
          });
          localStorage.setItem('Faculty',"false");
          navigate('/student/dashboard');
          window.location.reload(false);
        }
        
        return;
      }
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 404) {
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
        <FormControl id="userName">
          <Stack>
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
          </Stack>
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
            onClick={e => {
              loginHandler();
            }}
            
          >
            Login
          </Button>
        </Stack>
        <Center>
          <Text fontWeight={500}>Don't have account?</Text>
          <Text onClick={facultyRegisterHandler}>Faculty SignUp :</Text>
          <Text onClick={studentRegisterHandler}>: Student SignUp</Text>
        </Center>
        
      </Stack>
    </Flex>
  );
}

export default LoginPage;
