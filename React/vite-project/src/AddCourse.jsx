import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
function AddCourse() {
  const navigate = useNavigate();
  const [course, setCourse] = React.useState("");
  const [description,setdescription]=React.useState("");
  const [imgLink,setimgLink]=React.useState("");
  const [price,setprice]=React.useState("");
  return (
    <>
      <Card
        sx={{ minHeight: "85vh" }}
        style={{
          borderRadius: 0,
          marginTop: "10px",
          boxShadow: "0px 0px 3px black",
        }}
      >
        <div style={{display:"flex",justifyContent:"end",margin:"20px"}}>
          <Button variant="contained" style={{backgroundColor:"#202124"}}
          onClick={()=>{
            navigate("/admcourse")
          }}
          >Your Course</Button>

        </div>
        <Typography
          style={{
            margin: "20px",
            fontSize: "40px",
          }}
        >
          Add Course:
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: "500px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Course Name"
              variant="outlined"

              onChange={(e)=>{
                setCourse(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Course Description"
              variant="outlined"
              onChange={(e)=>{
                setdescription(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Image Link"
              variant="outlined"
              
              onChange={(e)=>{
                setimgLink(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              type="number"
              onChange={(e)=>{
                setprice(e.target.value);
              }}
            />
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "#202124" }}
              onClick={async()=>{
                
                const res=await axios.post('http://localhost:3000/admin/addcourse',{
                  title: course,
                  description: description,
                  price: price,
                  imgLink:imgLink
                },{
                  headers:{
                    Authorization:"Bearer "+localStorage.getItem('token')
                  }
                })
                alert("course created");
              }}
            >
              Add Course
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
export default AddCourse;
