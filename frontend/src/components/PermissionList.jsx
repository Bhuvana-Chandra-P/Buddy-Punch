import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../api.services';

import {
  Text,
  useColorModeValue,
  Button,
  Stack,
  Center,
  Box,
  Heading,
} from '@chakra-ui/react';

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);
  const [dateAndTime, setdateAndTime] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  //const navigate = useNavigate();
  //console.log(courseId);
  const fetchCourse = async () => {
    let res = await ApiService.permissionList(courseId);
    console.log(res);
    setdateAndTime(res.data.dateAndTime);
    setPermissions(res.data.permissions);

    return;
  };

  useEffect(() => {
    fetchCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const permissionAcceptHandler = async id => {
    try {
      //setIsLoading(true);
      console.log(id);
      let res = await ApiService.acceptPermission(id);
      console.log(res);
      if (res.status === 200) {
        window.location.reload(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const permissionRejectHandler = async id => {
    try {
      let res = await ApiService.rejectPermission(id);
      console.log(res);
      if (res.status === 200) {
        window.location.reload(false);
        return;

        //navigate(`/faculty/dashboard`);
        // fetchCourse();
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              <Text>Permissions </Text>
            </Heading>
            {permissions.length > 0 && (
              <>
                {permissions.map((permission, index) => (
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
                        <Text> Student Name : {permission.student.name}</Text>
                      </Stack>
                      <Stack>
                        <Text>
                          Student Roll No: {permission.student.rollNo}
                        </Text>
                      </Stack>
                      <Stack>
                        <Text>Subject : {permission.course.name}</Text>
                      </Stack>
                      <Stack>
                        <Text>Subject code: {permission.course.code}</Text>
                      </Stack>
                      <Stack>
                        <Text>Title : {permission.subject}</Text>
                      </Stack>
                      <Stack>
                        <Text>Reason : {permission.reason}</Text>
                      </Stack>
                      <Stack>
                        <Text>Start Date : {dateAndTime[index].startDate}</Text>
                      </Stack>
                      <Stack>
                        <Text> End Date : {dateAndTime[index].endDate}</Text>
                      </Stack>
                      <Stack direction={'row'} align={'center'}>
                        <Button
                          onClick={() =>
                            permissionAcceptHandler(permission._id)
                          }
                          color={'green.600'}
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() =>
                            permissionRejectHandler(permission._id)
                          }
                          color={'red.500'}
                        >
                          Reject
                        </Button>
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
export default PermissionList;
