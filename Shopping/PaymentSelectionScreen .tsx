import React from 'react';
import { View, Text, Button } from 'react-native';

const PaymentSelectionScreen = () => {
  return (
    <View>
      <Text>Select payment method:</Text>
      <Button title="Debit Card" onPress={() => alert('Debit Card selected')} />
      <Button title="Mobile Banking" onPress={() => alert('Mobile Banking selected')} />
    </View>
  );
}

export default PaymentSelectionScreen;