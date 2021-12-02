import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
} from './styles';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  function handleSignOut() {}

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton
            color={theme.colors.shape}
            onPress={() => navigation.goBack()}
          />
          <HeaderTitle>Editar perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo source={{ uri: 'https://github.com/gunners-pro.png' }} />
          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => setOption('dataEdit')}
          >
            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
          </Option>
          <Option active={option === 'passwordEdit'}>
            <OptionTitle
              active={option === 'passwordEdit'}
              onPress={() => setOption('passwordEdit')}
            >
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
}
