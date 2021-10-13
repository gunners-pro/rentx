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
  value?: string;
}

export function InputPassword({ iconName, value, ...rest }: Props) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        {...rest}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

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
