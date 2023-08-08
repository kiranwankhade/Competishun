import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Image, Button, useToast, Input, Collapse } from "@chakra-ui/react";
import Cards from "../Components/Cards";
import { useNavigate } from "react-router-dom";


import { auth } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../Components/Navbar";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useToast();
  const nav = useNavigate()
  const fetchData = async() => {
  try{
    let res = await fetch('https://open-nova-animal.glitch.me/hotels');
    let data1 = await res.json();
    setHotels(data1)
  }catch(err){
    console.log('err:', err)

  }
  }
  useEffect(() => {
    fetchData();
  }, []);

  

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {user ? <Navbar /> : nav("/")}
      <br/>
      <Box display={'flex'} flexDirection={'row'} gap={5} justifyContent={'center'} alignItems={'baseline'} w={'90%'} m={'auto'}>
        <Text fontWeight={'bold'} color={"#3182ce"}>Search Hotels</Text>
        <Input 
          w={'60%'}
          value={search}
          onChange={handleSearchChange}
          placeholder="Search hotels..."
          mb={4}
        />
      </Box>
      <Box w="95%" margin={"auto"} display={"grid"} gridTemplateColumns={{sm:"repeat(2,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} gap="30px" >
        {filteredHotels.map((hotel, index) => (
        
          <Cards key={index} el={hotel}/>
        ))}
      </Box>
    </div>
  );
}

export default Dashboard;

