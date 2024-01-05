import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
function Appbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{backgroundColor:"#202124"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Learn It !
          </Typography>
          <Button color="inherit" onClick={()=>{
                navigate("/login")
              }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;
