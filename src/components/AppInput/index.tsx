import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../shared/colors';

type Props = {
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export function AppInput({
  placeholder,
  icon,
  secureTextEntry = false,
  value,
  onChangeText,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        secureTextEntry={secureTextEntry && !showPassword}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={18}
            color={colors.textLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.borderMid,
    opacity: 0.8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textDark,
    fontFamily: 'Nunito_600SemiBold',
    padding: 0,
  },
});
