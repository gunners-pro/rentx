import React, { useEffect, useState, useRef } from 'react';
import {
  Alert,
  StatusBar,
  BackHandler,
  FlatList,
  FlatListProps,
  LayoutAnimation,
  Button,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { synchronize } from '@nozbe/watermelondb/sync';
import Logo from '../../assets/logo.svg';
import { CardCar } from '../../components/CardCar';
import { Container, Header, TotalCars } from './styles';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/model/Car';

type NavigationProps = {
  navigate: (screen: string, data?: CarProps) => void;
};

export interface CarProps {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Array<{
    id: string;
    type: string;
    name: string;
  }>;
  photos: Array<{
    id: string;
    photo: string;
  }>;
}

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  const scrollY = useRef(new Animated.Value(0)).current;

  const CustomFlatlist =
    Animated.createAnimatedComponent<FlatListProps<ModelCar>>(FlatList);

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const carResponse = await carCollection.query().fetch();
        if (isMounted) {
          setCars(carResponse);
        }
      } catch {
        Alert.alert(
          'Ops',
          'Não foi possível carregar os dados., Tente novamente mais tarde.',
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

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

      <Button title="Sincronizar" onPress={offlineSynchronize} />

      {loading ? (
        <LoadAnimation />
      ) : (
        <CustomFlatlist
          contentContainerStyle={{
            padding: 24,
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: true },
          )}
          data={cars}
          renderItem={({ item, index }) => {
            const inputRange = [-1, 0, 126 * index, 126 * (index + 2)];
            const opacityInputRange = [-1, 0, 126 * index, 126 * (index + 0.7)];
            LayoutAnimation.linear();

            const styleScale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });

            const styleOpacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });

            return (
              <Animated.View
                key={item.id}
                style={{
                  transform: [{ scale: styleScale }],
                  opacity: styleOpacity,
                }}
              >
                <CardCar
                  item={item}
                  onPress={() => navigation.navigate('CarDetails', item)}
                />
              </Animated.View>
            );
          }}
        />
      )}
    </Container>
  );
}
