import React, {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {globalStyle} from '../../assets/styles/globalStyle';

const labels = [
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const customStyles = {
  stepIndicatorSize: 14,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#f9b000',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#f9b000',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#f9b000',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#f9b000',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  lalabelColor: '#999999',
  labelAlign: 'flex-start',
  labelPaddingTop: 4,
  labelSize: 11,
  currentStepLabelColor: '#f9b000',
};

const OrderTracking = ({route}) => {

  const {orderStatus} = route.params;
  const rippleAnim = useRef(new Animated.Value(1)).current;

  const currentPosition = labels.indexOf(orderStatus);
  const isValidStatus = currentPosition !== -1;

  useEffect(() => {
    if (!isValidStatus) return;

    const animation = Animated.loop(
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
    );

    animation.start();

    return () => animation.stop();
  }, [rippleAnim, isValidStatus]);

  const renderStepIndicator = ({position, stepStatus}) => {
    const isActive = position === currentPosition;

    return (
      <View style={styles.circleWrapper}>
        {isActive && (
          <Animated.View
            style={[
              styles.ripple,
              {
                transform: [{scale: rippleAnim}],
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
                  ? '#f9b000'
                  : '#ffffff',
              borderColor: stepStatus === 'finished' ? '#f9b000' : '#aaaaaa',
              borderWidth: stepStatus === 'current' ? 0 : 2,
            },
          ]}
        />
      </View>
    );
  };

  const renderSeparator = ({position}) => {
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
      {isValidStatus ? (
        <StepIndicator
          direction="vertical"
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
          renderStepIndicator={renderStepIndicator}
          renderSeparator={renderSeparator}
        />
      ) : (
        <View style={styles.invalidStatusContainer}>
          <Animated.Text style={styles.invalidStatusText}>
            Invalid order status
          </Animated.Text>
        </View>
      )}
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
  invalidStatusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invalidStatusText: {
    color: '#999',
    fontSize: 16,
  },
});

export default OrderTracking;
