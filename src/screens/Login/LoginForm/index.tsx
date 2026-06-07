import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppInput } from '../../../components/AppInput';
import { AppButton } from '../../../components/AppButton';

type Props = {
  onSubmit: () => void;
};

export function LoginForm({ onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <AppInput
        placeholder="Usuário"
        icon="person-outline"
      />
      <AppInput
        placeholder="Senha"
        icon="lock-closed-outline"
        secureTextEntry
      />
      <AppButton label="Entrar" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
});
