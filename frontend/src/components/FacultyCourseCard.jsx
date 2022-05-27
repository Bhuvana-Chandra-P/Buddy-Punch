import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Text,
  Stack,
  useColorModeValue,
  Center,
  Heading,
  Box,
  Button,
} from '@chakra-ui/react';

const CourseCard = ({ course }) => {
  const { name, code, _id } = course;
  console.log(_id);
  console.log(name, code);

  const navigate = useNavigate();
  //const toast = useToast();
  const detailsHandler = async () => {
    navigate(`/faculty/courseDetails/${_id}`);
  };

  const addStudentHandler = async () => {
    navigate(`/addStudent/${_id}`);
  };
  const addClassHandler = async () => {
    navigate(`/createClass/${_id}`);
  };
  const permissionsHandler = async () => {
    navigate(`/faculty/permissionList/${_id}`);
  };
  return (
    <>
      <Center p = {4} >
        <Box
          role={'group'}
          p={6}
          maxW={'630px'}
          minW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
          d="flex"
        >
          <Stack pt={3} align={'center'}>
            <Stack onClick={detailsHandler} align={'center'}>
              <Text
                color={'gray.500'}
                fontSize={'3xl'}
                textTransform={'uppercase'}
              >
                {name}
              </Text>
              <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                Subject Code : {code}
              </Heading>
            </Stack>

            <Stack direction={'row'} align={'center'}>
              <Button onClick={addStudentHandler} fontSize={'12px'}>
              Add Student
              </Button>
              <Button onClick={addClassHandler} fontSize={'12px'}>Add Class</Button>
              <Button onClick={permissionsHandler} fontSize={'12px'}>Permissions</Button>
              {/* <Link to={`/addStudent/${_id}`} >Add Student</Link>
              <Link to={`/createClass/${_id}`}>Add Class</Link>
              <Link to={`/faculty/permissionList/${_id}`}>Permissions</Link> */}
            </Stack>
          </Stack>
        </Box>
      </Center>
    </>
  );
};
export default CourseCard;
