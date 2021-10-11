import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import Logo from '../../assets/logo.svg';
import { CardCar } from '../../components/CardCar';
import {
  Container,
  Header,
  TotalCars,
  CarList,
  MyScheduleFloatButton,
} from './styles';
import { api } from '../../services/api';

type NavigationProps = {
  navigate: (screen: string, data?: CarProps) => void;
};

export interface CarProps {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: {
    period: string;
    price: number;
  };
  fuel_type: string;
  thumbnail: string;
  accessories: Array<{
    type: string;
    name: string;
  }>;
  photos: Array<string>;
}

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch {
        Alert.alert(
          'Ops',
          'Não foi possível carregar os dados., Tente novamente mais tarde.',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.header}
      />
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de {cars.length} carros</TotalCars>
      </Header>

      {loading ? (
        <ActivityIndicator
          color={theme.colors.main}
          size="large"
          style={{ flex: 1 }}
        />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardCar
              item={item}
              onPress={() => navigation.navigate('CarDetails', item)}
            />
          )}
        />
      )}

      <MyScheduleFloatButton onPress={() => navigation.navigate('MySchedules')}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyScheduleFloatButton>
    </Container>
  );
}
