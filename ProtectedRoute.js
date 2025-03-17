import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({navigation, children}) => {
  const {isAuthenticated, loading} = useSelector(state => state.user);

  console.log('checking the user authentications', isAuthenticated);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.replace('EmailEntry',{ redirectTo: 'Checkoutform' });
    }
  }, [isAuthenticated, loading, navigation]);

  if (loading) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
