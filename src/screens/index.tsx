import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Home';
import { MyCards } from './MyCards';

const Stack = createNativeStackNavigator();

export const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="MyCards" component={MyCards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
