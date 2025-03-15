import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/Navigations/RootNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './Store';
import { PersistGate } from 'redux-persist/integration/react';
import { UserConText } from './UserConText';

export default function App() {
  return (
    <Provider store={store}>
      <UserConText>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
      </UserConText> 
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
