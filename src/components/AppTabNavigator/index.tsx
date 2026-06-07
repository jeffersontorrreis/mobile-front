import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../../screens/Home';
import { ProfileScreen } from '../../screens/Profile';
import { colors } from '../../shared/colors';

export type PrivateTabParamList = {
  Inicio: undefined;
  Titulo1: undefined;
  Titulo2: undefined;
  Titulo3: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<PrivateTabParamList>();

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <Text style={{ fontFamily: 'Poppins_600SemiBold', color: colors.textLight, fontSize: 15 }}>
        {title}
      </Text>
    </View>
  );
}

function NotifDot() {
  return <View style={styles.notifDot} />;
}

function Titulo1Screen() {
  return <PlaceholderScreen title="Titulo1" />;
}

function Titulo2Screen() {
  return <PlaceholderScreen title="Titulo2" />;
}

function Titulo3Screen() {
  return <PlaceholderScreen title="Titulo3" />;
}

export function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={23}
                color={color}
              />
              {/* focused && <NotifDot />*/}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Titulo1"
        component={Titulo1Screen}
        options={{
          tabBarLabel: 'Titulo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'analytics-sharp' : 'analytics-sharp'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Titulo2"
        component={Titulo2Screen}
        options={{
          tabBarLabel: 'Titulo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'flame' : 'flame-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Titulo3"
        component={Titulo3Screen}
        options={{
          tabBarLabel: 'Titulo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'receipt' : 'receipt-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={23}
                color={color}
              />
              {/* !focused && <NotifDot /> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.navbarBg,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingBottom: 4,
    height: 62,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    marginTop: -2,
  },
  notifDot: {
    position: 'absolute',
    top: 0,
    right: -4,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.notifRed,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});
