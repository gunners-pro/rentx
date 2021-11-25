import React, { useEffect, useState, useRef } from 'react';
import {
  Alert,
  StatusBar,
  BackHandler,
  FlatList,
  FlatListProps,
  LayoutAnimation,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import Logo from '../../assets/logo.svg';
import { CardCar } from '../../components/CardCar';
import { Container, Header, TotalCars } from './styles';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';

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
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  const scrollY = useRef(new Animated.Value(0)).current;

  const CustomFlatlist =
    Animated.createAnimatedComponent<FlatListProps<CarProps>>(FlatList);

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if (isMounted) {
          setCars(response.data);
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
