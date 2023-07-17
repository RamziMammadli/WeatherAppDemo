import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/routes/Stack';
import {Provider} from 'react-redux';
import { store } from './src/api/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
