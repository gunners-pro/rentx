import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  Section,
} from './styles';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { useAuth } from '../../hooks/auth';

import ProfileImg from '../../assets/images/profile.png';

const avatarProfile = Image.resolveAssetSource(ProfileImg).uri;

export function Profile() {
  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleSignOut() {}

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Photo
                source={{ uri: avatar.length !== 0 ? avatar : avatarProfile }}
              />
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() * 1.5 }}>
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

            {option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCapitalize="none"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  autoCapitalize="none"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <InputPassword
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <InputPassword
                  iconName="lock"
                  placeholder="Nova senha"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <InputPassword
                  iconName="lock"
                  placeholder="Repetir nova senha"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
