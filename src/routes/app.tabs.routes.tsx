import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import MySchedules from '../screens/MySchedules';
import { AppStackRoutes } from './app.stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AppStackRoutes" component={AppStackRoutes} />
      <Screen name="Profile" component={Home} />
      <Screen name="MySchedules" component={MySchedules} />
    </Navigator>
  );
}
