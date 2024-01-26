import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
import { useNavigate } from "react-router-dom";
function Courses() {
    const navigate = useNavigate();
    const [courses,setcourses]=React.useState([]);
    React.useEffect(()=>{
      (async()=>{
          const res=await axios.get("http://localhost:3000/users/courses",{
          headers:{
              Authorization:"Bearer "+localStorage.getItem('token')
          }
      })
      setcourses(res.data.courses);
      })();
  },[])
  if(courses.length==0)return <>
      <Card
      
        style={{
          borderRadius: 0,
          marginTop: "10px",
          boxShadow: "0px 0px 3px black",
          minHeight:"85vh"
        }}
      >
        none
      </Card>
    </>
    
  return (
    <>
      <Card
      
        style={{
          borderRadius: 0,
          marginTop: "10px",
          boxShadow: "0px 0px 3px black",
          minHeight:"85vh"
        }}
      >
        <div style={{display:"flex",justifyContent:"end",margin:"20px"}}>
          <Button variant="contained" style={{backgroundColor:"#202124"}}
          onClick={()=>{
            navigate("/mycourse")
          }}
          >Purchased Courses</Button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
            {courses.map(course=>{
                return <div style={{margin:"7px",display:"flex",justifyContent:'center'
                }}>
                  <div style={{
                    width:"400px",
                    border:"3px solid black",
                    borderRadius:"5px",
                    padding:"10px",
                    marginBlock:"20px"
                  }}>
                    <Div style={{fontSize:"large"}}>{course.title}</Div>
                    <div> <img src={course.imgLink} alt="#" style={{width:"100%",aspectRatio:"2"}} /></div>
                    <Div>{course.description}</Div>
                    <Div>Price:{course.price}</Div>
                    <Button 
                    variant="contained" 
                    style={{backgroundColor:"#202124"}}
                    onClick={async()=>{
                    
                      const result = await axios.post(`http://localhost:3000/users/courses/${course._id}`,{},{
                        headers:{
                          authorization:`Bearer ${localStorage.getItem("token")}`
                        }
                      })
                      alert("Course Purchased Successfully");
                    }}
                    >Buy Course</Button>
                  </div>
                </div>
            })}
        </div>
      </Card>
    </>
  );
}
export default Courses;
