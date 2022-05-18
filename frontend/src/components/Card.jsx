import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

import { Flex, Text, Stack, Button, useColorModeValue,} from '@chakra-ui/react';

const CourseCard = ({ course }) => {
  const { name, code, _id } = course;
  console.log(_id);
  console.log(name, code);
  
  const navigate = useNavigate();
  //const toast = useToast();
  const detailsHandler = async () => {
    navigate(`/student/courseDetails/${_id}`);
  }
  return (
    <Flex
      minH={'10vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      onClick = {detailsHandler}
    >
      <Text>Name : {name}</Text>
      <Text>Subject Code : {code}</Text>
      <Link to={`/leave/${_id}`}>Leave</Link>
      <Stack spacing={6} direction={['column', 'row']}>
        <Button
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }}
        >
          see more
        </Button>
      </Stack>
    </Flex>
  );
};
export default CourseCard;
