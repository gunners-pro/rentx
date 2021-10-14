import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import format from 'date-fns/format';
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  Datetitle,
  Datevalue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { Button } from '../../components/Button';
import { CarProps } from '../Home';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';

interface RouteParams {
  car: CarProps;
  dates: Array<string>;
}

interface RentalPeriodProps {
  start: string;
  end: string;
}

type NavigationProps = {
  goBack: () => void;
  navigate: (screen: string, data: object) => void;
};

type ResponseApi = {
  unavailable_dates: Array<string>;
};

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps,
  );
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car, dates } = route.params as RouteParams;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    const schedulesByCar = await api.get<ResponseApi>(
      `/schedules_bycars/${car.id}`,
    );

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post('schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'Home',
          title: 'Carro alugado !',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        });
      })
      .catch(() =>
        Alert.alert('Alerta', 'Não foi possível confirmar o agendamento'),
      );
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });
  }, [dates]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background_secondary}
      />
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
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
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>

          <RentalPeriod>
            <CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>
            <DateInfo>
              <Datetitle>DE</Datetitle>
              <Datevalue>{rentalPeriod.start}</Datevalue>
            </DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(15)}
              color={theme.colors.text}
            />

            <DateInfo>
              <Datetitle>ATÉ</Datetitle>
              <Datevalue>{rentalPeriod.end}</Datevalue>
            </DateInfo>
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>Total</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>
                R$ {car.rent.price} x{dates.length} diárias
              </RentalPriceQuota>
              <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Content>

        <Footer>
          <Button
            title="Alugar agora"
            color={theme.colors.success}
            onPress={handleConfirmRental}
          />
        </Footer>
      </Container>
    </>
  );
}
