import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../routes/PublicRoutes';
import { colors } from '../../shared/colors';

type Props = NativeStackScreenProps<PublicStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const nameY = useRef(new Animated.Value(16)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(200),
          Animated.parallel([
            Animated.timing(nameOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(nameY, { toValue: 0, duration: 500, useNativeDriver: true }),
          ]),
        ]),
        Animated.sequence([
          Animated.delay(400),
          Animated.parallel([
            Animated.timing(taglineOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(taglineY, { toValue: 0, duration: 500, useNativeDriver: true }),
          ]),
        ]),
      ]),
      Animated.delay(1800),
    ]).start(() => {
      navigation.replace('Login');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Animated.Text
          style={[styles.appName, { opacity: nameOpacity, transform: [{ translateY: nameY }] }]}
        >
          AGP Mobile
        </Animated.Text>
        <Animated.Text
          style={[styles.tagline, { opacity: taglineOpacity, transform: [{ translateY: taglineY }] }]}
        >
          AGROPALMA
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    fontSize: 30,
    fontFamily: 'Nunito_900Black',
    color: 'rgba(255,255,255,0.88)',
    letterSpacing: -0.3,
  },
  tagline: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.8,
  },
});
