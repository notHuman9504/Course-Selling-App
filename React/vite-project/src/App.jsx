import React, { useEffect } from 'react'
import Landing from './Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './Appbar';
import {
  RecoilRoot,
} from 'recoil';
import {useSetRecoilState, useRecoilValue} from "recoil";
import SignUp from './SignUp';
import LogIn from './LogIn';
import AdminCourse from './AdminCourse';
import axios from "axios";
import Courses from './Courses';
import AddCourse from './AddCourse';
import { userState } from './store/atoms/user';
import PurchasedCourse from './PurchasedCourse';
import EditCourse from './EditCourse';
function App() {
  return (
    
    <>
      <RecoilRoot>
      <div> 
        <Router>
        <Appbar></Appbar>
        <Init></Init>
          
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/admcourse" element={<AdminCourse/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/addcourses" element={<AddCourse/>}/>
          <Route path="/mycourse" element={<PurchasedCourse/>}/>
          <Route path="/editcourse/:cid" element={<EditCourse/>}/>
          
          <Route path="/" element={<Landing/>}/>
        </Routes>
      </Router>
      </div>
    </RecoilRoot>
    </>
  )
}
function Init(){
  const setUser=useSetRecoilState(userState);
  const init=async()=>{
    try{
      const res=await axios.get("http://localhost:3000/admin/me",{
        headers:{
          Authorization:"Bearer "+localStorage.getItem('token')
        }})
        
      if(res.data.username){
        setUser({
          isLoading:false,
          userid:res.data.username
        })
      }
      else
      {
        setUser({
          isLoading:false,
          userid:null
        })
      }
    }
    catch(e)
    {
      try{
        const res=await axios.get("http://localhost:3000/user/me",{
        headers:{
          Authorization:"Bearer "+localStorage.getItem('token')
        }})
        if(res.data.username){
          setUser({
            isLoading:false,
            userid:res.data.username
          })
        }
        else
        {
          setUser({
            isLoading:false,
            userid:null
          })
        }
      }
      catch(e)
      {
        setUser({
          isLoading:false,
          userid:null
        })
      }
      
    }  
  }
  React.useEffect(()=>{
    init();
  },[])
  return <></>
}

export default App
