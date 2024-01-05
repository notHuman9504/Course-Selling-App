import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
function LogIn() {
    const navigate = useNavigate();
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
              <Button variant="text" style={{ fontSize: "20px" ,color:"#202124"}} onClick={()=>{
                navigate("/signup")
              }}>
                SignUp
              </Button>
              /
              <Button variant="text" style={{ fontSize: "20px" ,color:"#202124"}}>
                <u>Login</u>
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
                />
              </div>
              <div>
                <Button variant="contained"
                size="large"
           
                    style={{
                        width:"350px",
                        marginBlock:"20px",
                        fontSize:"18px",
                        backgroundColor:"#202124"
                      }}
                >
                    Log In
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
}
export default LogIn;
