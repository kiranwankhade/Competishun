import { Box, Button, Card, CardBody, Center, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SinglePage = () => {
    const {id} = useParams();
    const [data,setData] = useState({});
    const toast = useToast()
    const getData = async(id)=>{
        let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a03c89ec4f4a772469f97c6616924cc8`);
        let data1 = await response.json();
        console.log('data1:', data1)
        setData(data1);
    }
    const handleAlert = ()=>{
        toast({
            title: "Movie is Playing",
            status: 'success',
            isClosable: true,
            position:'top-right'
          })
    }
    useEffect(()=>{
        getData(id);
    },[id]);
    console.log("data",data);
  return (
    <>
    <Box maxH={'md'}>
        <Center><Heading color={'#4285f4'}>Movie Details</Heading></Center>
        <br/>
        <Box maxH={'100vh'} display={'flex'} w={'90%'} m={'auto'} flexDirection={{lg:'row' , sm:'column',md:'row'}} justifyContent={'space-around'} alignItems={'center'} gap={10}>
          <Box>
            <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt=''
                borderRadius='lg'
                />
          </Box>
          <Box display={'flex'} flexDirection='column' justifyContent={'space-around'} alignItems={{lg:'baseline',sm:'center',md:'baseline'}} textAlign={'justify'} gap={5}>
          <Heading size='lg'>{data.title}</Heading>
          <Text>
              <Heading size={'md'}>Overview :</Heading> 
              <br/>
              {data.overview}
          </Text>
          <Text>
              <Heading size={'md'}>Release Date :</Heading>
              <br/>
              {data.release_date}
          </Text>

          <Box display={"flex"}  justifyContent={"space-between"} alignItems={'center'} gap={5}>
                    <Heading  size={'md'}>Genres</Heading>
                    {data.genres?.map((el)=>(
                        <Button key={el.id} fontSize={"15px"} bg="none" border={"1px solid gray"}>{el.name}</Button>
                    ))}
          </Box>

          <Text >
              <Heading size={'md'}>Ratings :</Heading>
              <br/>
              <Box w="30%" >
                 <CircularProgressbar value={data.vote_average} maxValue={10} text={`${data.vote_average * 10}%`} />
                </Box>
          </Text>
        
              <Button onClick={handleAlert} colorScheme='blue'>Play Now </Button>
          </Box>
        </Box>
    </Box>
    </>
  )
}

export default SinglePage