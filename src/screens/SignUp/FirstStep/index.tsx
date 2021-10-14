import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
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
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

type NavigationProps = {
  goBack: () => void;
  navigate: (screen: string, params: object) => void;
};

export default function SignUpFirstStep() {
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  async function handleNextStep() {
    try {
      const schema = yup.object().shape({
        driverLicense: yup.string().required('CNH obrigatória'),
        email: yup
          .string()
          .email('E-mail inválido')
          .required('E-mail obrigatório'),
        name: yup.string().required('Nome obrigatório'),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert('Opa...', error.message);
      }
    }
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
