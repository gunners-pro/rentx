import React from 'react';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Container, Header, Title, SubTitle, Form, Footer } from './styles';

export default function SignIn() {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <Title>
          Estamos {'\n'}
          quase lá.
        </Title>
        <SubTitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível.
        </SubTitle>
      </Header>

      <Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <InputPassword iconName="lock" placeholder="Senha" />
      </Form>

      <Footer>
        <Button title="Login" onPress={() => {}} enabled={false} />
        <Button
          title="Criar conta gratuita"
          light
          onPress={() => {}}
          color={theme.colors.background_secondary}
        />
      </Footer>
    </Container>
  );
}
