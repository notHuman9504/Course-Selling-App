import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useSetRecoilState, useRecoilValue} from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from './store/atoms/user';

function Appbar() {

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{backgroundColor:"#202124"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Learn It !
          </Typography>
          
          <Appfunc></Appfunc>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
function Appfunc(){
  const navigate = useNavigate();
  const setUser=useSetRecoilState(userState);
  const id=useRecoilValue(userState).userid;
  if(id==null)
  {
    return(<Button color="inherit" onClick={()=>{
      navigate("/login")
    }}>Login</Button>)
  }
  return<>

    <Button color="inherit" style={{color:"white"}} onClick={()=>{
    }}>{id}</Button>
    <Button color="inherit" onClick={()=>{
      localStorage.setItem("token",null);
      
      setUser({
        isLoading:false,
        userid:null
      })
      navigate("/login")
    }}>LogOut</Button>
  </>
}
export default Appbar;
