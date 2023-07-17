import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../screens/Home'

const Stack = createNativeStackNavigator()

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default RootStack

const styles = StyleSheet.create({})