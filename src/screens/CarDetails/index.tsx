import React, { useEffect, useState } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';
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
  OfflineInfo,
} from './styles';
import { Button } from '../../components/Button';
import { CarProps } from '../Home';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/model/Car';
import { api } from '../../services/api';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type NavigationProps = {
  navigate: (screen: string, car?: CarProps) => void;
};

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarProps>({} as CarProps);
  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const car = route.params as ModelCar;
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

  useEffect(() => {
    async function fetchaCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchaCarUpdated();
    }
  }, [car.id, netInfo.isConnected]);

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
          <ImageSlider
            imageUrl={
              carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
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
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => navigation.navigate('Scheduling', carUpdated)}
          enabled={netInfo.isConnected === true}
        />
        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se à Internet para ver mais detalhes
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}
