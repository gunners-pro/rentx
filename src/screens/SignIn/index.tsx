import React from 'react';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Container, Header, Title, SubTitle, Footer } from './styles';

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
