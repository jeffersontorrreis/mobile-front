import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginForm } from './LoginForm';
import { useAuth } from '../../contexts/auth.context';
import { PublicStackParamList } from '../../routes/PublicRoutes';
import { colors } from '../../shared/colors';

type Props = NativeStackScreenProps<PublicStackParamList, 'Login'>;

const { width, height } = Dimensions.get('window');
// Circle large enough to cover the entire screen from its center
const circleSize = Math.sqrt(width * width + height * height) * 1.1;

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();

  const overlayScale = useRef(new Animated.Value(1)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(16)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;
  const subY = useRef(new Animated.Value(16)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formY = useRef(new Animated.Value(16)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  function fadeSlideIn(opacity: Animated.Value, y: Animated.Value, delay: number) {
    return Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 450, delay, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 450, delay, useNativeDriver: true }),
    ]);
  }

  useEffect(() => {
    Animated.parallel([
      // Circular overlay collapses like the HTML clip-path:circle(100%→0%) effect
      Animated.timing(overlayScale, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
      fadeSlideIn(titleOpacity, titleY, 150),
      fadeSlideIn(subOpacity, subY, 280),
      fadeSlideIn(formOpacity, formY, 410),
      Animated.timing(footerOpacity, { toValue: 1, duration: 400, delay: 640, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <Animated.Text
          style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}
        >
          {'Bem-vindo,\ncolaborador!'}
        </Animated.Text>

        <Animated.Text
          style={[styles.sub, { opacity: subOpacity, transform: [{ translateY: subY }] }]}
        >
          Faça login para continuar
        </Animated.Text>

        <Animated.View
          style={[styles.formWrapper, { opacity: formOpacity, transform: [{ translateY: formY }] }]}
        >
          <LoginForm onSubmit={signIn} />
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
        <Text style={styles.footerText}>
          Processos e Sistemas · Todos os direitos reservados
        </Text>
      </Animated.View>

      {/* Circular overlay that collapses to reveal the login screen (mirrors HTML clip-path animation) */}
      <Animated.View
        pointerEvents="none"
        style={[styles.circleOverlay, { transform: [{ scale: overlayScale }] }]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Nunito_900Black',
    color: colors.textMid,
    textAlign: 'center',
    lineHeight: 34,
  },
  sub: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: colors.textLight,
    textAlign: 'center',
    marginTop: -4,
    marginBottom: 4,
  },
  formWrapper: {
    width: '100%',
  },
  footer: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: colors.textFaint,
    letterSpacing: 0.5,
  },
  circleOverlay: {
    position: 'absolute',
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: colors.primaryDark,
    top: (height - circleSize) / 2,
    left: (width - circleSize) / 2,
    zIndex: 100,
  },
});
