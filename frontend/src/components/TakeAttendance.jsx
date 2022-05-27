import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../api.services';
import Navbar from './navbar';
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
  const [image] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const webcamRef = React.useRef(null);
  const { classId,courseId } = useParams();
  let imageSrc;
  const loginHandler = async () => {
    setIsLoading(true);
    try {
      imageSrc = webcamRef.current.getScreenshot();
      //setImage(imageSrc);
      const image = JSON.stringify(imageSrc);
      let data = { image: image, classId: classId };
      let token = localStorage.getItem('Token');
      const res = await ApiService.takeAttendance(data, token);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        navigate(`/takeAttendance/${classId}`);
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

  const backHandler = async () => {
    navigate(`/classDetails/${courseId}/${classId}`)
  }

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
              onClick={e => {
                loginHandler();
              }}
              isLoading={isLoading}
            >
              Mark Present
            </Button>
          </Stack>
          <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={e => {
                backHandler();
              }}
              isLoading={isLoading}
            >
              Back to class Details
            </Button>
        </Stack>
      </Flex>
    </>
  );
}

export default LoginPage;
