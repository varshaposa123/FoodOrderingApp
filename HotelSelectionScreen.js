import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const HotelSelectionScreen = ({ navigation }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Sample list of hotels
  const hotels = [
    { id: 'hotel1', name: 'prabha' },
    { id: 'hotel2', name: 'supreme' },
    { id: 'hotel3', name: 'varsha' },
    // Add more hotels as needed
  ];

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);

    // Navigate to the Menu Selection screen with the selected hotel
    navigation.navigate('MenuSelectionScreen', { selectedHotel: hotel });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Hotel</Text>
      {hotels.map((hotel) => (
        <View style={styles.hotelItem} key={hotel.id}>
          <Text>{hotel.name}</Text>
          <Button title="Select" onPress={() => handleHotelSelect(hotel)} />
        </View>
      ))}
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
  hotelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});

export default HotelSelectionScreen;
