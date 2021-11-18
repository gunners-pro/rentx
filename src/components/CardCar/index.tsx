import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
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
  fuel_type: string;
  period: string;
  price: number;
  thumbnail: string;
}

interface DataCar {
  item: Props;
  onPress: () => void;
}

export function CardCar({ item, onPress, ...rest }: DataCar) {
  const MotorIcon = getAccessoryIcon(item.fuel_type);

  return (
    <Container onPress={onPress} {...rest}>
      <Details>
        <Brand>{item.brand}</Brand>
        <Name>{item.name}</Name>

        <About>
          <Rent>
            <Period>{item.period}</Period>
            <Price>{`R$ ${item.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
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
