// BrandLogoSplash.js
import React, {useEffect, useRef} from 'react';
import {View, Animated, Image, StyleSheet} from 'react-native';
import Bootsplash from 'react-native-bootsplash';

const Brandbootsplash = ({ onAnimationEnd }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 👇 Hide the native splash immediately before animation
    Bootsplash.hide({ fade: true });

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        onAnimationEnd();
      }, 500);
    });
  }, [onAnimationEnd]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/bootsplash/logo.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727', // match your brand color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
  },
});

export default Brandbootsplash;
