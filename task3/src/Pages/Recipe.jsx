import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Heading, Input, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Cards from '../Components/Cards';
import {AiOutlineDown} from "react-icons/ai"


const Recipe = () => {

    const [recipe,setRecipe] = useState({});

    const [search,setSearch] = useState("");

    const [page,setPage] = useState(1);

    const [cusType,setCusType] = useState("Indian");
  

    const getData = async(page,search,cusType)=>{
        if(search===""){
            let res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=0ff2a7c5&app_key=aaf4638ba88fd4fe323009e0cb4e5150&cuisineType=${cusType}&from=0&to=5`);

            let data1 = await res.json();
            setRecipe(data1);
        }else {
            let res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=0ff2a7c5&app_key=aaf4638ba88fd4fe323009e0cb4e5150&cuisineType=${cusType}&q=${search}&from=0&to=5`);
            let data1 = await res.json();
            setRecipe(data1);
        }
      }

      useEffect(()=>{
        getData(page,search,cusType)
      },[page,search,cusType])

      console.log("Recipe",recipe)

  return (
   <Box>    
        <br/>
        <Center><Heading color={'#4285f4'}>Recipe App</Heading></Center>
        <br/>
        <Box display={"flex"} flexDirection={{base:'row',sm:'column' ,md:'row',lg:'row'}} justifyContent={"flex-end"} alignContent={'center'} alignItems={'center'} w="95%" m={'auto'} gap={'10'}>
            <Box>
                <Input  type="text" placeholder='Search Recipe' htmlSize={{base:'50',sm:'30' ,md:'40',lg:'50'}} width='auto' bg={"white"} onChange={(e)=>setSearch(e.target.value)}/>
            </Box>
            <Box>
                <Menu>
                    <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
                    Curise Type: {cusType}
                    </MenuButton>
                    <MenuList onClick={(e)=>setCusType(e.target.value)}>
                    <MenuItem value={"Indian"}>Indian</MenuItem>
                    <MenuItem value={"Chinese"}>Chinese</MenuItem>
                    <MenuItem value={"French"}>French</MenuItem>
                    <MenuItem value={"Mexican"}>Mexican</MenuItem>
                    <MenuItem value={"Asian"}>Asian</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <Box  display={"flex"} justifyContent={{base:"flex-end",lg:"flex-end",sm:'center',md:'center'}} alignContent={'center'} alignItems={'center'} w="95%" gap={'10'} >
                <Button isDisabled={page===1} onClick={()=>setPage(page-1)}>Prev</Button>
                <Button>{page}</Button>
                <Button isDisabled={recipe?.total_pages===page} onClick={()=>setPage(page+1)}>Next</Button>
            </Box>
        </Box>
       
        <br/>
        <Box w="95%" margin={"auto"} display={"grid"} gridTemplateColumns={{sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} gap="30px" >
            {recipe && recipe.hits && recipe.hits?.map((el,i)=>(
                <Cards key={i} el={el}/>
            ))}   
        </Box>
       
   </Box>
  )
}

export default Recipe