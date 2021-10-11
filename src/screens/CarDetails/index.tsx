import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { CarProps } from '../Home';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

type NavigationProps = {
  navigate: (screen: string, car?: CarProps) => void;
};

export function CarDetails() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const car = route.params as CarProps;
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
  }));

  const sliderCarStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
  }));

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background_secondary}
      />

      <Animated.View style={[headerStyle]}>
        <Header>
          <BackButton onPress={() => navigation.navigate('Home')} />
        </Header>

        <Animated.View style={sliderCarStyleAnimation}>
          <ImageSlider imageUrl={car.photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ padding: 24, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => navigation.navigate('Scheduling', car)}
        />
      </Footer>
    </Container>
  );
}
