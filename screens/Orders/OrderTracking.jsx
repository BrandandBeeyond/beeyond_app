import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { globalStyle } from '../../assets/styles/globalStyle';

const labels = [
  'Order Placed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const currentPosition = 3;

const customStyles = {
  stepIndicatorSize: 14,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const OrderTracking = () => {
  const rippleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rippleAnim]);

  const renderStepIndicator = ({ position, stepStatus }) => {
    const isActive = position === currentPosition;
  
    return (
      <View style={styles.circleWrapper}>
        {isActive && (
          <Animated.View
            style={[
              styles.ripple,
              {
                transform: [{ scale: rippleAnim }],
                opacity: rippleAnim.interpolate({
                  inputRange: [1, 1.5],
                  outputRange: [0.4, 0],
                }),
              },
            ]}
          />
        )}
        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                stepStatus === 'finished'
                  ? '#fe7013'
                  : stepStatus === 'current'
                  ? '#ffffff'
                  : '#ffffff',
              borderColor:
                stepStatus === 'finished' ? '#fe7013' : '#aaaaaa',
              borderWidth: stepStatus === 'current' ? 0 : 2,
            },
          ]}
        />
      </View>
    );
  };
  

  const renderSeparator = ({ position }) => {
    const isFinished = position < currentPosition;
    return (
      <View style={styles.separatorContainer}>
        <Animated.View
          style={[
            styles.separator,
            {
              backgroundColor: isFinished ? '#fe7013' : '#aaaaaa',
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={[globalStyle.flex, globalStyle.bgTheme]}>
      <StepIndicator
        direction="vertical"
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={labels.length}
        renderStepIndicator={renderStepIndicator}
        renderSeparator={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
  },
  ripple: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fe7013',
    zIndex: -1,
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 2,
    height: '100%',
    borderRadius: 1,
  },
});

export default OrderTracking;
