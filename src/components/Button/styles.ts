import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps extends RectButtonProps {
  color: string;
}

interface TitleProps {
  light: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  padding: 19px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) => color || theme.colors.main};
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
