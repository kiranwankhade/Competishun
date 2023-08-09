import React from 'react'
import { Box, Button,Center, Heading, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import { AiOutlineDown } from "react-icons/ai";
import Cards from '../Components/Cards';

const Calorie = () => {
    const [data,setData] = useState({});
    const [cusType,setCusType] = useState("Indian");
    const [value,setVal] = useState(100);
    const getData = async(value,cusType)=>{

        let res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=0ff2a7c5&app_key=aaf4638ba88fd4fe323009e0cb4e5150&cuisineType=${cusType}&calories=${value}&from=0&to=5`);

        let data1 = await res.json();
        setData(data1);
    }
    
    useEffect(()=>{
        getData(value,cusType);
    },[value,cusType]);
    console.log(data);
  return (
    <Box>
       <br/>
        <Center><Heading color={'#4285f4'}>Calorie</Heading></Center>
        <br/>
        <Box display={"flex"} flexDirection={{sm:'column' ,md:'row',lg:'row'}} justifyContent={"flex-end"} alignContent={'flex-end'} alignItems={'flex-end'} w="95%" m={'auto'} gap={'10'}>
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
          <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
              Calories Selection: {value}
            </MenuButton>
            <MenuList onClick={(e)=>setVal(e.target.value)}>
              <MenuItem value={"100-300"}>100-300</MenuItem>
              <MenuItem value={"301-500"}>301-500</MenuItem>
              <MenuItem value={"501-600"}>501-600</MenuItem>
              <MenuItem value={"601-700"}>601-700</MenuItem>
              <MenuItem value={"701-800"}>701-800</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <br/>
        <Box w="95%" margin={"auto"} display={"grid"} gridTemplateColumns={{sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} gap="30px" >
            {data && data.hits && data.hits?.map((el,i)=>(
                <Cards key={i} el={el}/>
            ))}   
        </Box>
    </Box>
  )
}

export default Calorie