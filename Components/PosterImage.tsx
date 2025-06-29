

import React, { useState } from 'react';
import { Image, ImageStyle } from 'react-native';

interface PosterImageProps {
  uri?: string | null;
  style: ImageStyle;
}

export default function PosterImage({ uri, style }: PosterImageProps) {
  const [error, setError] = useState(false);

  const isInvalid =
    error ||
    typeof uri !== 'string' ||
    uri.trim() === '' ||
    !uri.startsWith('http');

  return (
    <Image
      source={
        isInvalid
          ? require('../assets/poster_not_found.png')
          : { uri }
      }
      style={style}
      onError={() => setError(true)}
      resizeMode="cover"
    />
  );
}

