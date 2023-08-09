import { Box } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import Recipe from './Recipe';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <Box>
            {!user ? <Navigate to="/login" /> :  <Recipe/>}
        </Box>
      )
  
}

export default Dashboard