import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../api.services';

import {
  Text,
  useColorModeValue,
  Stack,
  Heading,
  Center,
  Box,
  useToast,
} from '@chakra-ui/react';

const MonitorDetails = () => {
  const [monitor, setMonitor] = useState([]);
  const { classId } = useParams();
  const toast = useToast();
  const fetchMonitorDetails = async () => {
    try {
      let res = await ApiService.displayMonitorDetails(classId);
      console.log(res);
      setMonitor(res.data.monitor);

      return;
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

  useEffect(() => {
    fetchMonitorDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'700px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Stack pt={10} align={'center'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              <Text>Details </Text>
            </Heading>
            {monitor.length > 0 && (
              <>
                {monitor.map((student, index) => (
                  <>
                    <Box
                      role={'group'}
                      p={8}
                      maxW={'700px'}
                      w={'full'}
                      boxShadow={'2xl'}
                      rounded={'lg'}
                      pos={'relative'}
                      zIndex={1}
                      mb={3}
                    >
                      <Stack>
                        <Text> Student Name : {student.student.name}</Text>
                      </Stack>
                      <Stack>
                        <Text>Student Roll No: {student.student.rollNo}</Text>
                      </Stack>
                      <Stack>
                        <Text>Comment : {student.overall}</Text>
                      </Stack>
                      <Stack>
                        <Text>Noise : {student.noise}</Text>
                      </Stack>
                      <Stack>
                        <Text>smile : {student.smile}</Text>
                      </Stack>
                      <Stack>
                        <Text>Happiness : {student.happiness}</Text>
                      </Stack>
                      <Stack>
                        <Text> Anger : {student.anger}</Text>
                      </Stack>
                      <Stack>
                        <Text>Contempt: {student.contempt}</Text>
                      </Stack>
                      <Stack>
                        <Text>Disgust : {student.disgust}</Text>
                      </Stack>
                      <Stack>
                        <Text>Fear : {student.fear}</Text>
                      </Stack>
                      <Stack>
                        <Text>Neutral : {student.neutral}</Text>
                      </Stack>
                      <Stack>
                        <Text>Sadness : {student.sadness}</Text>
                      </Stack>
                      <Stack>
                        <Text>Surprise: {student.surprise}</Text>
                      </Stack>
                      <Stack>
                        <Text>Eye Occluded : {student.eyeOccluded}</Text>
                      </Stack>
                      <Stack>
                        <Text>
                          No of Head Turns :{' '}
                          {student.yaw + student.pitch + student.roll}
                        </Text>
                      </Stack>
                    </Box>
                  </>
                ))}
              </>
            )}
          </Stack>
        </Box>
      </Center>
    </>
  );
};
export default MonitorDetails;
