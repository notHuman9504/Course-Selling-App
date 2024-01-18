import React from 'react'
import Landing from './Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './AppBar';
import {
  RecoilRoot,
} from 'recoil';
import SignUp from './SignUp';
import LogIn from './LogIn';
import AdminCourse from './AdminCourse';
import Courses from './Courses';

function App() {
  return (
    
    <>
      <RecoilRoot>
      <div> 
        <Router>
        <Appbar></Appbar>
          
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/admcourse" element={<AdminCourse/>}/>
          <Route path="/courses" element={<Courses/>}/>
          
          <Route path="/" element={<Landing/>}/>
        </Routes>
      </Router>
      </div>
    </RecoilRoot>
    </>
  )
}

export default App
