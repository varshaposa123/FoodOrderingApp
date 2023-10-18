import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HotelSelectionScreen from './HotelSelectionScreen';
import MenuSelectionScreen from './MenuSelectionScreen';
import AddToCartScreen from './AddToCartScreen';

import HelpScreen from './HelpScreen';

// Import icon components from react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose a different set of icons

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Login') {
              iconName = 'user';
            } else if (route.name === 'Help') {
              iconName = 'question-circle';
            }

            // You can add more conditions for other tabs and icons

            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue', // Set your preferred active color
          inactiveTintColor: 'gray', // Set your preferred inactive color
        }}
      >
        <Tab.Screen
          name="Login"
          component={LoginStackScreen}
          options={{ title: 'Food Ordering App' }}
        />
        <Tab.Screen
          name="Help"
          component={HelpScreen}
          options={{ title: 'Help' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const LoginStackScreen = () => (
  <Stack.Navigator >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="HotelSelectionScreen" component={HotelSelectionScreen} />
    <Stack.Screen name="MenuSelectionScreen" component={MenuSelectionScreen} />
    <Stack.Screen name="AddToCartScreen" component={AddToCartScreen} />
  </Stack.Navigator>
);

export default App;
