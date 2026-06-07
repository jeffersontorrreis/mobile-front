import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../../screens/Home';
import { ProfileScreen } from '../../screens/Profile';
import { colors } from '../../shared/colors';

export type PrivateTabParamList = {
  Inicio: undefined;
  Busca: undefined;
  Hits: undefined;
  Pedidos: undefined;
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

function BuscaScreen() {
  return <PlaceholderScreen title="Busca" />;
}

function HitsScreen() {
  return <PlaceholderScreen title="Hits" />;
}

function PedidosScreen() {
  return <PlaceholderScreen title="Pedidos" />;
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
        name="Busca"
        component={BuscaScreen}
        options={{
          tabBarLabel: 'Titulo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'receipt' : 'search-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Hits"
        component={HitsScreen}
        options={{
          tabBarLabel: 'Titulo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'receipt' : 'flash-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={PedidosScreen}
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
