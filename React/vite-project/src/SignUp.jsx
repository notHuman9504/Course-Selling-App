import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";
function SignUp() {
  const navigate = useNavigate();
  const [username,setusername]=React.useState(null);
  const [password,setpassword]=React.useState(null);
  const setUserState=useSetRecoilState(userState);
  return (
    <>
      <Card
        sx={{ minWidth: 275 }}
        style={{
          borderRadius: 0,
          marginTop: "10px",
          boxShadow: "0px 0px 3px black",
        }}
      >
        <div style={{ height: "85vh" }}>
          <CardContent
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{marginBlock:"50px"}}>
              <Button variant="text" style={{ fontSize: "20px" ,color:"#202124"}}>
                <u>SignUp</u>
              </Button>
              /
              <Button variant="text" style={{ fontSize: "20px" ,color:"#202124"}} onClick={()=>{
                navigate("/login")
              }}>
                Login
              </Button>
            </div>

            <div style={{height:"40%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  style={{
                    width:"350px",
                    marginBlock:"20px"
                  }}
                  onChange={(e)=>{
                    setusername(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  style={{
                    width:"350px"
                  }}
                  onChange={(e)=>{
                    setpassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <Button variant="contained"
                size="large"
                  style={{
                      width:"350px",
                      marginTop:"20px",
                      marginBottom:"5px",
                      fontSize:"15px",
                      backgroundColor:"#202124"
                    }}
                    onClick={async ()=>{
                      const res=await axios.post('http://localhost:3000/users/signup',{
                        id:username,
                        pass:password
                      },{
                        headers:{
                          "Content-Type":"application/json",
                        }
                      })
  
                      if(!res.data.token)
                          {
                            alert("SignUp Failed!");
                            return;
                          }
                          
                      localStorage.setItem("token",res.data.token);
                      setUserState({
                        isLoading:false,
                        userid:username
                      })
                      navigate('/courses');
                    }}

                  
                >
                    Sign Up
                </Button>
              </div>
              <div>
                <Button variant="contained"
                size="large"
                    style={{
                        width:"350px",
                        
                        fontSize:"15px",
                        backgroundColor:"#202124"
                      }}
                      onClick={async ()=>{
                      
                        const res=await axios.post('http://localhost:3000/admin/signup',{
                          id:username,
                          pass:password
                        },{
                          headers:{
                            "Content-Type":"application/json",
                          }
                        })
                        if(!res.data.token)
                        {
                          alert("SignUp Failed!");
                          return;

                        }
                        localStorage.setItem("token",res.data.token);
                        setUserState({
                          isLoading:false,
                          userid:username
                        })
                        navigate('/admcourse');
                      }}
                >
                    Admin Sign Up
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
}
export default SignUp;
