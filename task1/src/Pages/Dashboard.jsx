import { Box } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom';
import Movie from './Movie';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <Box>
            {!user ? <Navigate to="/login" /> :  <Movie/>}
        </Box>
      )
  
}

export default Dashboard