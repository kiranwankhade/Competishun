import { Box, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const CardsReused = ({el}) => {
    const navigate = useNavigate();

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} transition={"transform .2s"} _hover={{transform:"scale(1.05)"}}>
        <Card maxW='sm' w={'90%'}>
            <CardBody>
                <Image
                w={'80%'}
                m={'auto'}
                src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                verticalAlign={"center"}
                onClick={()=>navigate(`/singlepage/${el.id}`)}
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{el.original_title}</Heading>
                <Text fontSize={"20px"}>
                    Release Date: {el.release_date}
                </Text>
                </Stack>
            </CardBody>
        </Card>
    </Box>
  )
}

export default CardsReused;