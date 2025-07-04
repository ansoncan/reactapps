
// import React, { useState } from 'react';
// import { Image } from 'react-native';

// const PosterImage = ({ uri, style }) => {
//   const [error, setError] = useState(false);
//   const isInvalid = error || !uri || !uri.startsWith('http');

//   return (
//     <Image
//       source={isInvalid ? require('../assets/poster_not_found.png') : { uri }}
//       style={style}
//       onError={() => setError(true)}
//       resizeMode="cover"
//     />
//   );
// };

// export default PosterImage;

import React, { useState } from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';

interface PosterImageProps {
  uri?: string; // Make it optional
  style: StyleProp<ImageStyle>;
}

const PosterImage: React.FC<PosterImageProps> = ({ uri, style }) => {
  const [error, setError] = useState(false);
  const isInvalid = error || typeof uri !== 'string' || !uri.startsWith('http');

  return (
    <Image
      source={isInvalid ? require('../assets/poster_not_found.png') : { uri }}
      style={style}
      onError={() => setError(true)}
      resizeMode="cover"
    />
  );
};

export default PosterImage;
