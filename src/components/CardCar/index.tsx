import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import Gasoline from '../../assets/gasoline.svg';
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface Props extends RectButtonProps {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface DataCar {
  item: Props;
  onPress: () => void;
}

export function CardCar({ item, onPress, ...rest }: DataCar) {
  return (
    <Container onPress={onPress} {...rest}>
      <Details>
        <Brand>{item.brand}</Brand>
        <Name>{item.name}</Name>

        <About>
          <Rent>
            <Period>{item.rent.period}</Period>
            <Price>{`R$ ${item.rent.price}`}</Price>
          </Rent>

          <Type>
            <Gasoline />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: item.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
