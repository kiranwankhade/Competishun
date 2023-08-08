import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from '../Pages/SignUp';
import Reset from '../Pages/Reset';
import Login from '../Pages/Login';
import Movie from '../Pages/Movie';
import Dashboard from '../Pages/Dashboard';
import Favourites from '../Pages/Favourites';
import WatchList from '../Pages/WatchList';
import SinglePage from '../Pages/SinglePage';

const AllRoutes = () => {
  return (
    <div>                          
            <Routes>                     
                <Route path="/" element={<Dashboard/>}/> 
                <Route path="/login" element={<Login/>}/> 
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/reset" element={<Reset/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
                <Route path="/watchlist" element={<WatchList/>}/>
                <Route path="/singlepage/:id" element={<SinglePage/>}/>

                
            </Routes>  
      </div>
  )
}

export default AllRoutes