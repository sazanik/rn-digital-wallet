import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Home';
import { MyCards } from './MyCards';
import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

export const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            contentStyle: { backgroundColor: colors.white },
          }}
        />
        <Stack.Screen
          name="MyCards"
          component={MyCards}
          options={{
            title: 'My Cards',
            contentStyle: { backgroundColor: colors.white },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
