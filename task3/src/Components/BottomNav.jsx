import React from 'react';
import { Box, Tab, TabList, Tabs, Flex  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Firebase/firebase';

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <Box
    px={4}
    py={2}
    boxShadow="md"
    position='fixed'
    width="100%"
    bottom={0}
    bg="white"
    zIndex='sticky'
    >
      <Flex
        direction={{ base: 'column', sm: 'column' }} 
        justify="center" 
        align="center"
        wrap="wrap"
      >
        <Tabs isFitted variant='enclosed'>
          <TabList display="flex" justifyContent="space-around">
            <Tab
              onClick={() => navigate('/')}
              _selected={{ color: 'blue.500', borderBottom: '2px solid blue.500' }}
            >
              Recipe
            </Tab>
            <Tab
              onClick={() => navigate('/calorie')}
              _selected={{ color: 'blue.500', borderBottom: '2px solid blue.500' }}
            >
              Calorie
            </Tab>
            <Tab
              onClick={() => navigate('/diet')}
              _selected={{ color: 'blue.500', borderBottom: '2px solid blue.500' }}
            >
              Diet
            </Tab>

            <Tab
              onClick={()=> {
                logout();
                navigate('/login')
              }}
              _selected={{ color: 'blue.500', borderBottom: '2px solid blue.500' }}
            >
              Logout
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default BottomNav;
