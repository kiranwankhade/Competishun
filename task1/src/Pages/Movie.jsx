import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Heading, Input } from '@chakra-ui/react';
import Cards from '../Components/Cards';



const Movie = () => {

    const [movies,setMovies] = useState({});

    const [search,setSearch] = useState("");

    const [page,setPage] = useState(1);

  

    const getData = async(page,search)=>{
        if(search===""){
            let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a03c89ec4f4a772469f97c6616924cc8&page=${page}&query=${search}`);

            let data1 = await res.json();
            setMovies(data1);
        }else {
            let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a03c89ec4f4a772469f97c6616924cc8&page=${page}&query=${search}`);
            let data1 = await res.json();
            setMovies(data1);
        }
      }

      useEffect(()=>{
        getData(page,search)
      },[page,search])

      console.log("Movies",movies)

  return (
   <Box>    
        <br/>
        <Center><Heading color={'#4285f4'}>Movie App</Heading></Center>
        <br/>
        <Box display={"flex"} flexDirection={{sm:'column' ,md:'row',lg:'row'}} justifyContent={"flex-end"} alignContent={'flex-end'} alignItems={'flex-end'} w="95%" m={'auto'} gap={'10'}>
            <Box>
                <Input  type="text" placeholder='Search movies' htmlSize={"50"} width='auto' bg={"white"} onChange={(e)=>setSearch(e.target.value)} display={{sm:"none",lg:"block"}}/>
            </Box>

            <Box  display={"flex"} justifyContent={"flex-end"} alignContent={'flex-end'} alignItems={'flex-end'} w="95%" gap={'10'} >
                <Button isDisabled={page===1} onClick={()=>setPage(page-1)}>Prev</Button>
                <Button>{page}</Button>
                <Button isDisabled={movies?.total_pages===page} onClick={()=>setPage(page+1)}>Next</Button>
            </Box>
        </Box>
        <br/>
        <Box w="95%" margin={"auto"} display={"grid"} gridTemplateColumns={{sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} gap="30px" >
            {movies && movies.results && movies.results?.map((el,i)=>(
                <Cards key={i} el={el}/>
            ))}   
        </Box>
       
   </Box>
  )
}

export default Movie