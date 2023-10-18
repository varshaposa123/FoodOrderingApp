import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const MenuSelectionScreen = ({ route, navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { selectedHotel, conversionRate } = route.params; // Get the selected hotel and conversion rate from the previous screen

  // Sample list of menu items for the selected hotel in RS
  const menuItems = [
    { id: 'item1', name: 'pav bhaji', price: 10, quantity: 0 },
    { id: 'item2', name: 'samosa', price: 12, quantity: 0 },
    { id: 'item3', name: 'pani puri', price: 8, quantity: 0 },
    // Add more menu items as needed
  ];

  const handleItemSelect = (item, quantityChange) => {
    // Find the selected item in the state
    const selectedItem = selectedItems.find((selected) => selected.id === item.id);

    if (selectedItem) {
      // If the item is already in the selectedItems array, update its quantity
      selectedItem.quantity += quantityChange;

      if (selectedItem.quantity === 0) {
        // If the quantity becomes 0, remove the item from selectedItems
        setSelectedItems(selectedItems.filter((selected) => selected.quantity > 0));
      } else {
        // Create a new array without the old item and add the updated item
        setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id).concat(selectedItem));
      }
    } else {
      // If the item is not in selectedItems, add it
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleNext = () => {
    // Navigate to the Add to Cart screen with the selected items, hotel, and conversion rate
    navigation.navigate('AddToCartScreen', {
      selectedItems,
      selectedHotel,
      conversionRate,
    });
  };

  // Calculate the total price in RS
  const totalPriceRS = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // Calculate the total price in USD using the conversion rate
  const totalPriceUSD = (totalPriceRS * conversionRate).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu Selection</Text>
      <Text>Selected Hotel: {selectedHotel.name}</Text>
      <Text>Total Price (RS): {totalPriceRS}</Text>
      <Text>Total Price (USD): {totalPriceUSD}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name} - RS {item.price} (Qty: {item.quantity})</Text>
            <Button title="+" onPress={() => handleItemSelect(item, 1)} />
            <Button title="-" onPress={() => handleItemSelect(item, -1)} disabled={item.quantity === 0} />
          </View>
        )}
      />
      <Button title="Next" onPress={handleNext} />
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});

export default MenuSelectionScreen;
