import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';

import { AppInput } from '../../../components/AppInput';
import { AppButton } from '../../../components/AppButton';

export interface FormLoginParams {
  email: string;
  password: string;
}

interface props {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(data: FormLoginParams) {
    console.log('Email:', data.email);
    console.log('Senha:', data.password);
    onLogin();
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <AppInput
            placeholder="Usuário"
            icon="person-outline"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <AppInput
            placeholder="Senha"
            icon="lock-closed-outline"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <AppButton label="Entrar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
});
