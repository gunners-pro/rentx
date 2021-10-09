import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { CardCar } from '../../components/CardCar';
import theme from '../../theme';
import { Container, Header, TotalCars, CarList } from './styles';

export function Home() {
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'ao dia',
      price: 120,
    },
    thumbnail:
      'https://production.autoforce.com/uploads/used_model/profile_image/21174070/used_model_comprar-rs-5-pcd-sportback-1165_fcdc130f2e.png',
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.header}
      />
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de 12 carros</TotalCars>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={() => <CardCar {...carData} />}
      />
    </Container>
  );
}
