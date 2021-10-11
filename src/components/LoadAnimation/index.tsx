import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import LoadingCar from '../../assets/load_animated.json';
import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <AnimatedLottieView
        source={LoadingCar}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
