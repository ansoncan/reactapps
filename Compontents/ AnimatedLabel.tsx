// AnimatedLabel.tsx
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native';

interface AnimatedLabelProps {
  label: string;
  focused: boolean;
}

const AnimatedLabel: React.FC<AnimatedLabelProps> = ({ label, focused }) => {
  return (
    <Animatable.Text
      animation={focused ? 'pulse' : undefined}
      duration={500}
      style={{
        fontSize: 12,
        color: focused ? '#007AFF' : '#8e8e93',
        fontWeight: focused ? 'bold' : 'normal',
      }}
    >
      {label}
    </Animatable.Text>
  );
};

export default AnimatedLabel;
