import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import { Box, Heading } from '@chakra-ui/react';
import CardsReused from '../Components/CardsReused';

const Favourites = () => {

  const [user, loading, error] = useAuthState(auth);
  const [favData,setFavData] = useState();

  const getdata = () => {
    fetch("https://glossy-nifty-market.glitch.me/competishunUsers")
      .then((response) => response.json())
      .then((users) => {
        let data = users.find((u) => u.email === user.email);

        if (data) {
          setFavData(data.favorites)
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    getdata();
  },[])
  

  console.log("Fav",favData)

  return (
    <>
    <br/>
    <Heading textAlign={"center"} color={'#4285f4'}>Favorites</Heading>

    <Box w={'90%'} m={'auto'} pt="30px" display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap="10px">
      {favData && favData?.map((el)=>(
        <CardsReused key={el.id} el={el}/>
      ))}
    </Box>
  </>
  )
}

export default Favourites