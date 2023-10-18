import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('foodOrdering.db');

// Function to create the "orders" table
const createOrdersTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, hotel TEXT, total_bill REAL);',
      [],
      (tx, result) => {
        console.log('Orders table created');
      },
      (tx, error) => {
        console.error('Error creating orders table:', error);
      }
    );
  });
};

const AddToCartScreen = ({ route, navigation }) => {
  const { selectedItems, selectedHotel, username } = route.params;
  const [totalBill, setTotalBill] = useState(0);

  // Function to handle navigation to the next screen
  const handleNext = () => {
    // Navigate to the next screen with necessary data
    navigation.navigate('NextScreen', {
      selectedItems,
      selectedHotel,
      username,
      totalBill,
    });
  };

  useEffect(() => {
    createOrdersTable(); // Create the "orders" table if it doesn't exist

    // Calculate the total bill in INR
    const billInINR = selectedItems.reduce((total, item) => total + item.price, 0);
    setTotalBill(billInINR);
  }, [selectedItems]); // Include selectedItems as a dependency to recalculate when items change

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add to Cart</Text>
      <Text>Selected Hotel: {selectedHotel.name}</Text>
      <Text>Selected Items:</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name} - ₹{item.price}</Text>
          </View>
        )}
      />

      <Text>Total Bill: ₹{(totalBill || 0).toFixed(2)}</Text>

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
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});

export default AddToCartScreen;
