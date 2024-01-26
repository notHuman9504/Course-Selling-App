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
function AdminCourse() {
    const navigate = useNavigate();
    const [admincourses,setadmincourses]=React.useState([]);
    React.useEffect(()=>{
        (async()=>{
            const res=await axios.get("http://localhost:3000/admin/courses",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
        setadmincourses(res.data.adminCourse);
        })();
    },[])
    if(admincourses.length==0)return <>
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
            navigate("/addcourses")
          }}
          >Add Course</Button>

        </div>
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
            navigate("/addcourses")
          }}
          >Add Course</Button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
            {admincourses.map(course=>{
                return <div style={{width:"400px",display:"flex",justifyContent:'center'
                }}>
                  <div style={{
                    width:"400px",
                    border:"3px solid black",
                    borderRadius:"5px",
                    padding:"10px",
                    marginBlock:"20px"
                  }}>
                    <Div style={{fontSize:"large"}}>{course.title}</Div>
                    <div> <img src={course.imgLink} alt="#" style={{width:"100%"}} /></div>
                    <Div>{course.description}</Div>
                    <Div>Price:{course.price}</Div>
                    <Button variant="contained" style={{backgroundColor:"#202124"}}>Edit</Button>
                    <Button variant="contained" style={{backgroundColor:"#202124",margin:"10px"}}>Delete</Button>
                    
                  </div>
                </div>
            })}
        </div>
      </Card>
    </>
  );
}
export default AdminCourse;
