import React, { ComponentProps, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import {
  Container,
  InputText,
  IconContainer,
  PasswordVisibilityButton,
} from './styles';

interface Props extends TextInputProps {
  iconName: ComponentProps<typeof Feather>['name'];
}

export function InputPassword({ iconName, ...rest }: Props) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <PasswordVisibilityButton
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </PasswordVisibilityButton>
    </Container>
  );
}
