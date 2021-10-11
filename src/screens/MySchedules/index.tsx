import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, FlatList, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
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

interface ICarProps {
  id: string;
  user_id: string;
  car: CarProps;
  startDate: string;
  endDate: string;
}

export default function MySchedules() {
  const theme = useTheme();
  const [cars, setCars] = useState<ICarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1');
        setCars(response.data);
      } catch {
        Alert.alert('Alerta', 'Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
          <ActivityIndicator
            size="large"
            color={theme.colors.main}
            style={{ flex: 1 }}
          />
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
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
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
