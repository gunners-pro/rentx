import React from 'react';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface Props {
  imageUrl: Array<string>;
}

export function ImageSlider({ imageUrl }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage source={{ uri: imageUrl[0] }} resizeMode="contain" />
      </CarImageWrapper>
    </Container>
  );
}
