import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarProps } from '../Home';

type NavigationProps = {
  navigate: (screen: string, props: {}) => void;
  goBack: () => void;
};

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps,
  );
  const route = useRoute();
  const car = route.params as CarProps;

  function handleChangedDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy',
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Alerta', 'Selecione o intervalo de datas');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.header}
      />
      <Container>
        <Header>
          <BackButton
            color={theme.colors.shape}
            onPress={() => navigation.goBack()}
          />
          <Title>
            Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
          </Title>

          <RentalPeriod>
            <DateInfo>
              <DateTitle>De</DateTitle>
              <DateValue selected={!!rentalPeriod.startFormatted}>
                {rentalPeriod.startFormatted}
              </DateValue>
            </DateInfo>

            <ArrowSvg />

            <DateInfo>
              <DateTitle>Até</DateTitle>
              <DateValue selected={!!rentalPeriod.endFormatted}>
                {rentalPeriod.endFormatted}
              </DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>

        <Content>
          <Calendar markedDates={markedDates} onDayPress={handleChangedDate} />
        </Content>
        <Footer>
          <Button title="Confirmar" onPress={handleConfirmRental} />
        </Footer>
      </Container>
    </>
  );
}
