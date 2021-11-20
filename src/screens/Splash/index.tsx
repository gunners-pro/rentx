import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import { Container } from './styles';

type NavigationProps = {
  navigate: (screen: string) => void;
};

export default function Splash() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const splashAnimation = useSharedValue(0);
  const brandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [0, -50],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));
  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.5, 1]),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [-50, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  useEffect(() => {
    function startApp() {
      navigation.navigate('SignIn');
    }

    splashAnimation.value = withTiming(50, { duration: 2000 }, () => {
      'worklet';

      runOnJS(startApp)();
    });
  }, [splashAnimation, navigation]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.header}
      />
      <Container>
        <Animated.View style={[brandStyle, { position: 'absolute' }]}>
          <BrandSvg width={80} height={50} />
        </Animated.View>

        <Animated.View style={[logoStyle, { position: 'absolute' }]}>
          <LogoSvg width={180} height={20} />
        </Animated.View>
      </Container>
    </>
  );
}
