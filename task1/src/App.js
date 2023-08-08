
import { Box, VStack } from '@chakra-ui/react';
import AllRoutes from './Routes/AllRoutes';
import BottomNav from './Components/BottomNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase/firebase';

function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <VStack minHeight="100vh" spacing={0}>
    <Box flex="1" overflow="auto" width="100%">
      <AllRoutes/>
    </Box>
    {user ? <BottomNav/> : <></>}
  </VStack>
  );
}

export default App;
