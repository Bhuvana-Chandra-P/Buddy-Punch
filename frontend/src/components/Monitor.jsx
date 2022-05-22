import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';
import { ApiService } from '../api.services';
import {
  Flex,
  FormControl,
  Stack,
  useColorModeValue,
  Center,
  useToast,
} from '@chakra-ui/react';
const videoConstraints = {
  width: 420,
  height: 400,
  facingMode: 'user',
};

function Monitor() {
  const [image] = useState('');
  //const [isLoading, setIsLoading] = useState(false);
  //const navigate = useNavigate();
  const toast = useToast();
  const webcamRef = React.useRef(null);
  const { classId } = useParams();

  let imageSrc;

  const monitor = async () => {
    //setIsLoading(true);
    try {
      imageSrc = webcamRef.current.getScreenshot();
      const image = JSON.stringify(imageSrc);
      let data = { image: image, classId: classId };
      await ApiService.monitor(data);
      //const res = await ApiService.monitor(data);
      //console.log(res);
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

  const MINUTE_MS = 20000;

  useEffect(() => {
    const interval = setInterval(() => {
      monitor();
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={550}
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
                    height={300}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={500}
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img src={image} alt="user-img" />
                )}
              </div>
            </Center>
          </Stack>
        </FormControl>
      </Stack>
    </Flex>
  );
}

export default Monitor;
