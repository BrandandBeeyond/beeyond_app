import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({navigation, children}) => {
  const {isAuthenticated, loading} = useSelector(state => state.user);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.replace('Login');
    }
  }, [isAuthenticated, loading, navigation]);

  if (loading) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
