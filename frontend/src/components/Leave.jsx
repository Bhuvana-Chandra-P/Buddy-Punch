import React, { useState } from 'react';
import moment from 'moment';
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
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../api.services';
import Navbar from '../components/navbar';
export default function Leave() {
  const [subject, setSubject] = useState();
  const [reason, setReason] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { courseId } = useParams();
  console.log(courseId);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const registerHandler = async () => {
    setIsLoading(true);
    try {
      let sD = new Date(startDate);
      let eD = new Date(endDate);
      if(eD < sD)
      {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "End date must not be grater than start date",
          status: 'warning',
          position: 'bottom-right',
          isClosable: true,
          duration: '5000',
        });
        return;
      }
      let data = {
        subject: subject,
        reason: reason,
        startDate: startDate,
        endDate: endDate,
        courseId: courseId, //'62847e3e5b3c2107e5acc0c6',
      };
      let token = localStorage.getItem('Token');
      const res = await ApiService.permission(data, token);
      if (res.status === 200) {
        setIsLoading(false);
        navigate('/student/dashboard');
        return;
      }
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 400) {
          setIsLoading(false);
          toast({
            title: "Error",
            description: `${err.response.data.message}`,
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
            Leave
          </Heading>

          <FormControl id="subject" isRequired>
            <FormLabel>Subject</FormLabel>
            <Input
              placeholder="Title"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </FormControl>
          <FormControl id="reason" isRequired>
            <FormLabel>Reason</FormLabel>
            <Input
              placeholder="Reason"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </FormControl>
          <FormControl id="startDate" isRequired>
            <FormLabel>Start Date</FormLabel>
            <Input
              placeholder=""
              _placeholder={{ color: 'gray.500' }}
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              min={moment().format('YYYY-MM-DD')}
            />
          </FormControl>
          <FormControl id="endDate" isRequired>
            <FormLabel>End Date</FormLabel>
            <Input
              placeholder=""
              _placeholder={{ color: 'gray.500' }}
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={moment().format('YYYY-MM-DD')}
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
    </>
  );
}
