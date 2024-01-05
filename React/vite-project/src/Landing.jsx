import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
function Landing() {
    const navigate = useNavigate();
  return (
    <>
    <Card  sx={{ minWidth: 275 }} style={{borderRadius:0,marginTop:"10px",boxShadow:"0px 0px 3px black"}}>
        <div style={{height:"85vh"}}>
            <CardContent style={{display:"flex",height:"100%",flexDirection:"column",justifyContent:"space-evenly"}}>
            

            <div >
                <Typography sx={{ fontSize: 50}}  gutterBottom>
                    Welcome to Our Website
                </Typography>
                <Typography sx={{ mb: 1.5, fontSize: 25}} color="text.secondary">
                It's About Learning your Way
                </Typography>
            </div>
            <div>
            <Typography sx={{ fontSize: 27}}  gutterBottom>
                    New User? 
                </Typography>
                <Typography sx={{ fontSize: 25}}  gutterBottom>
                    Join Us -- <Button variant="contained" style={{backgroundColor:"#202124"}} onClick={()=>{
                navigate("/signup")
              }}>Sign Up</Button>
                </Typography>
            </div>
            
        </CardContent>
        </div>  
      
      
    </Card>
    </>
  );
}
export default Landing;
