import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline';
};

export function AppButton({ label, onPress, variant = 'primary' }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, variant === 'outline' && styles.outline]}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, variant === 'outline' && styles.labelOutline]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    backgroundColor: colors.primaryMid,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primaryMid,
  },
  label: {
    fontSize: 17,
    fontFamily: 'Nunito_900Black',
    color: 'rgba(255,255,255,0.9)',
  },
  labelOutline: {
    color: colors.primaryMid,
  },
});
