import React from 'react';
import { View } from 'react-native';
import EncryptDecryptForm from './app/EncryptDecryptForm';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <EncryptDecryptForm />
    </View>
  );
}
