import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import {
  Container,
  Content,
  Title,
  Message,
  ConfirmButton,
  ConfirmButtonTitle,
} from './styles';

type navigationProps = {
  navigate: (screen: string) => void;
};

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<navigationProps>();
  const route = useRoute();
  const { message, title, nextScreenRoute } = route.params as Params;

  return (
    <Container>
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>

        <ConfirmButton onPress={() => navigation.navigate(nextScreenRoute)}>
          <ConfirmButtonTitle>OK</ConfirmButtonTitle>
        </ConfirmButton>
      </Content>
    </Container>
  );
}
