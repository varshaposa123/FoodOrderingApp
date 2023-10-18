import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help and Support</Text>
      <Text>
        If you need assistance or have any questions, please contact our
        support team at support@example.com.
      </Text>
      <Text>
        You can also visit our website at www.example.com for additional
        information and resources.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HelpScreen;
