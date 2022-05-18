import React ,{useEffect,useState}from 'react';
import { useParams} from 'react-router-dom';
import { ApiService } from '../api.services';

import { Flex, Text,  useColorModeValue, } from '@chakra-ui/react';



const CourseDetails = () => {
    //const toast = useToast();
    const [name,setName] = useState();
    const [code , setCode] = useState();
    const [facultyName , setFacultyName] = useState();
    const [noOfStudents , setNoOfStudents] = useState();
    const [noOfClasses , setNoOfClasses] = useState();
    const [noOfClassesPresent , setNoOfClassesPresent] = useState();
    const [students,setStudents] = useState([]);
    const { courseId } = useParams();
    console.log(courseId);

  const fetchCourse = async () => {
    let res = await ApiService.getCourseDetails(courseId);
    //console.log(res);
    let data = {
        courseId:courseId
    }
    let token = localStorage.getItem("Token")
    let result = await ApiService.noOfClassesAttended(data,token)
    setName(res.data.course.name);
    setCode(res.data.course.code);
    setFacultyName(res.data.course.faculty.name);
    setNoOfStudents(res.data.course.students.length);
    setNoOfClasses(res.data.course.classes.length);
    setStudents(res.data.course.students);
    setNoOfClassesPresent(result.data.noOfClasses)
    console.log(result);
    // setCourses(courses);
  };

  useEffect(() => {
    fetchCourse();
  });
 

 
  return (
    <Flex
      minH={'10vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Text>Name : {name}</Text>
      <Text>Subject Code : {code}</Text>
      <Text>Faculty Name : {facultyName}</Text>
      <Text>Number of Students : {noOfStudents}</Text>
      <Text>Number of Classes : {noOfClasses}</Text>
      <Text>Number of Classes Present : {noOfClassesPresent}</Text>
      <br></br>
      <Text>Name    Roll Number</Text>
      <>
      {students.length > 0 && (
        <>
          {students.map(student => (
            <>
              <Text>{student.name}    {student.rollNo}</Text>
            </>
          ))}
        </>
      )}
    </>
      
    </Flex>
  );
};
export default CourseDetails;
