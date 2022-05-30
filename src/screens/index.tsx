import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './Home';
import { MyCards } from './MyCards';
import { colors } from '../constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { AddSVG } from '../assets/SVGs/AddSVG';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

export const Root = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: colors.white }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'MyCards') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            return (
              <View>
                <AddSVG />
              </View>
            );
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={[colors.darkBlueGradient, colors.lightBlueGradient]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.tapBar}
            />
          ),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="MyCards"
          component={MyCards}
          options={{
            title: 'My Cards',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tapBar: {
    height: 100,
    width: '100%',
  },
});
