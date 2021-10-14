import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { InputPassword } from '../../../components/InputPassword';

type NavigationProps = {
  goBack: () => void;
  navigate: (screen: string, data: object) => void;
};

interface Params {
  user: {
    name: string;
    email: string;
    driveLicense: string;
  };
}

export default function SignUpSecondStep() {
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();
  const route = useRoute();
  const { user } = route.params as Params;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Alerta', 'Informe a senha e confirme');
    }
    if (password !== passwordConfirm) {
      return Alert.alert('Alerta', 'As senhas não são iguais');
    }

    // enviar para API
    navigation.navigate('Confirmation', {
      nextScreenRoute: 'SignIn',
      title: 'Conta Criada !',
      message: `Agora é só fazer login\n e aproveitar.`,
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={() => navigation.goBack()} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName="lock"
              placeholder="Confirmar senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
