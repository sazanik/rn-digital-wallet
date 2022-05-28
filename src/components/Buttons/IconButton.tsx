import React, { ReactNode } from 'react';
import { colors } from '../../constants/colors';
import { Pressable, View } from 'react-native';
import { commonStyles } from '../../constants/commonStyles';

interface Props {
  children?: ReactNode;
  onPress?: () => void;
}

export const IconButton = ({ children, onPress }: Props) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      hitSlop={{
        bottom: 20,
        left: 20,
        right: 20,
        top: 20,
      }}
      style={({ pressed }) =>
        pressed && {
          backgroundColor: colors.transparentGrey,
          borderRadius: 50,
        }
      }
      onPress={handlePress}>
      <View style={commonStyles.iconWrapper}>{children}</View>
    </Pressable>
  );
};
