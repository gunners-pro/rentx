import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
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

type NavigationProps = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );

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
              <DateValue selected={false}>18/06/2021</DateValue>
            </DateInfo>

            <ArrowSvg />

            <DateInfo>
              <DateTitle>Até</DateTitle>
              <DateValue selected={false}>18/06/2021</DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>

        <Content>
          <Calendar markedDates={markedDates} onDayPress={handleChangedDate} />
        </Content>
        <Footer>
          <Button title="Confirmar" />
        </Footer>
      </Container>
    </>
  );
}
