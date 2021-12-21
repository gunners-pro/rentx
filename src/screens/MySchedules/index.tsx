import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { format, parseISO } from 'date-fns';
import { BackButton } from '../../components/BackButton';
import { api } from '../../services/api';
import { CarProps } from '../Home';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { CardCar } from '../../components/CardCar';
import { LoadAnimation } from '../../components/LoadAnimation';

interface ICarProps {
  id: string;
  user_id: string;
  car: CarProps;
  start_date: string;
  end_date: string;
}

export default function MySchedules() {
  const theme = useTheme();
  const [cars, setCars] = useState<ICarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('rentals');
        const dataFormatted = response.data.map((data: ICarProps) => ({
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        }));
        setCars(dataFormatted);
      } catch {
        Alert.alert('Alerta', 'Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [isScreenFocused]);

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

          <SubTitle>Conforto, segurança e praticidade.</SubTitle>
        </Header>

        {loading ? (
          <LoadAnimation />
        ) : (
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => String(item.id)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <CardCar item={item.car} onPress={() => {}} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.end_date}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
        )}
      </Container>
    </>
  );
}
