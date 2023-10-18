import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [character, setCharacter] = useState(null);

  const handleLogin = () => {
    // Your login logic here...

    // Fetch data from SWAPI using Axios
    axios.get('https://swapi.dev/api/people/')
      .then((response) => {
        const data = response.data;
        // Assuming you want the first character from the results
        if (data.results && data.results.length > 0) {
          setCharacter(data.results[0]);
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
      });

    navigation.navigate('HotelSelectionScreen');
  };

  // Display character information if available
  useEffect(() => {
    if (character) {
      console.log('Character:', character);
    }
  }, [character]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
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
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
  
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  // Add more styles if needed
});

export default LoginScreen;
