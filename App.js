import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screens/HomeScreen'
import CreateUserScreen from './screens/CreateUserScreen'
import UserDetailsScreen from './screens/UserDetailsScreen'

const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{title:"User List"}} />
      <Stack.Screen name="Create User" component={CreateUserScreen} options={{title:"Create a New User"}} />
      <Stack.Screen name="User Details" component={UserDetailsScreen} options={{title:"User Details"}} />
    </Stack.Navigator>
  )

}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "center"
  },

  headerImg: {
    height: 80,
    width: 80,
    resizeMode: "contain",

  }
});
