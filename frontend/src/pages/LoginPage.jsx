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
} from '@chakra-ui/react';
const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: 'user',
};

function LoginPage() {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const webcamRef = React.useRef(null);

  let imageSrc;
  const loginHandler = async () => {
    setIsLoading(true);
    try {
      imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      const image = JSON.stringify(imageSrc);
      let data = { name: image };
      const res = await ApiService.loginStudent(data);
      console.log(res);
      if (res.status === 200) {
        const Token = res.data.token;
        localStorage.setItem('Token', Token);
        setIsLoading(false);
        navigate('/register');
        return;
      }
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 400) {
          setIsLoading(false);
          toast({
            title: 'Invalid credentials',
            description: 'Please enter valid credentials',
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
                  <img src={image} alt="user-img"/>
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
            onClick={e => {
              loginHandler();
            }}
            isLoading={isLoading}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default LoginPage;
