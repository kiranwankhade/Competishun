

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import { Box, Heading } from '@chakra-ui/react';
import CardsReused from '../Components/CardsReused';

const WatchList = () => {

  const [user, loading, error] = useAuthState(auth);
  const [watchData,setWatchData] = useState();

  const getdata = () => {
    fetch("https://glossy-nifty-market.glitch.me/competishunUsers")
      .then((response) => response.json())
      .then((users) => {
        let data = users.find((u) => u.email === user.email);

        if (data) {
          setWatchData(data.watchList)
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    getdata();
  },[])
  

  console.log("Watch",watchData)

  return (
    <>
    <br/>
    <Heading textAlign={"center"} color={'#4285f4'}>WatchList</Heading>

    <Box w={'90%'} m={'auto'} pt="30px" display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap="10px">
      {watchData && watchData?.map((el)=>(
        <CardsReused key={el.id} el={el}/>
      ))}
    </Box>
  </>
    
  )
}

export default WatchList;