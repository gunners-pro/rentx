import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import SpeedSvg from '../../assets/speed.svg';
// import AccelerationSvg from '../../assets/acceleration.svg';
// import ForceSvg from '../../assets/force.svg';
// import GasolineSvg from '../../assets/gasoline.svg';
// import ExchangeSvg from '../../assets/exchange.svg';
// import PeopleSvg from '../../assets/people.svg';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import {
  Container,
  Header,
  Content,
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

type NavigationProps = {
  navigate: (screen: string) => void;
};

export function CarDetails() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const car = route.params as CarProps;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background_secondary}
      />
      <Header>
        <BackButton onPress={() => navigation.navigate('Home')} />
      </Header>

      <ImageSlider imageUrl={car.photos} />

      <Content>
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
              icon={SpeedSvg}
            />
          ))}
          {/* <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} /> */}
        </Accessories>

        <About>{car.about} </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => navigation.navigate('Scheduling')}
        />
      </Footer>
    </Container>
  );
}
