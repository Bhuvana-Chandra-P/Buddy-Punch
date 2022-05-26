import { useEffect, useState} from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {  useNavigate } from 'react-router-dom';
import { ApiService } from '../api.services';


// const NavLink = () => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {/* {children} */}
//   </Link>
// );

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [name,setName] = useState();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Faculty");
    navigate('/login');
  }
  // const loginHandler = async () => {
  //   navigate('/login');
  // }
  const loginPasswordHandler = async () => {
    navigate('/login/password');
  }
  const dashboardHandler = async () => {
    if(!localStorage.getItem("Token"))
    {
      navigate('/login');
      return;
    }
    let b = localStorage.getItem("Faculty");
    console.log(b)
    if(b && b === "true")
    {
      navigate('/faculty/dashboard')
      return
    }
    else{
      navigate('/student/dashboard');
      return;
    }
      
    
  }
  const fetchUserName = async () => {
    let t = localStorage.getItem("Token")
    if(!t)
    {
      setName("Username");
      return;
    }else{
      let res = await ApiService.getUserName(t);
      if(res.status === 200)
      {
        setName(res.data.name);
        return;
      }
      else{
        setName("Username");
        return;
      }
    }
  }
  useEffect(() => {
    fetchUserName();
  }, []);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box fontWeight={500 } fontSize={'25px'}>Buddy Punch</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  {/* <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center> */}
                  <br />
                  <Center>
                    <p>{name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={dashboardHandler}>Dashboard</MenuItem>
                  {/* <MenuItem onClick={loginHandler}>Login</MenuItem> */}
                  <MenuItem onClick={loginPasswordHandler}>Login with Password</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}