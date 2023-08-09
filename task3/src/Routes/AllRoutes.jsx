import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from '../Pages/SignUp';
import Reset from '../Pages/Reset';
import Login from '../Pages/Login';
import Calorie from '../Pages/Calorie';
import Diet from '../Pages/Diet';
import Dashboard from '../Pages/Dashboard';


const AllRoutes = () => {
  return (
    <div>                          
            <Routes>                     
                <Route path="/" element={<Dashboard/>}/> 
                <Route path="/login" element={<Login/>}/> 
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/reset" element={<Reset/>}/>
                <Route path="/calorie" element={<Calorie/>}/>
                <Route path="/diet" element={<Diet/>}/>

               
            </Routes>  
      </div>
  )
}

export default AllRoutes