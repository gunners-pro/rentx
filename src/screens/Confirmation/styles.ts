import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  margin-top: 20px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  text-align: center;
  margin-top: 10px;
  line-height: ${RFValue(22)}px;
`;

export const ConfirmButton = styled(RectButton)`
  width: 80px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.shape_dark};
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const ConfirmButtonTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;
