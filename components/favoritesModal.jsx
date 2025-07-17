import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { debounce } from "lodash";
import { getPlasters } from "./database";
import { AppContext } from "./appMainContext";
import DisplayFavouriteEntry from "./displayFavouriteEntry"; // Component to display each favourite entry
const FavouritesModal = ({ visible, onClose }) => {
  const { setSelectedPlaster } = useContext(AppContext);
  const { favouriteList, setFavouriteList } = useContext(AppContext);

  useEffect(() => {
    if (!visible) {
      console.log("Modal closed, resetting search");
    }
  }, [visible]);
  const handleSelect = (plaster) => {
    setSelectedPlaster(plaster);
    onClose(); // Close modal after selection
  };
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>favourites</Text>

          <FlatList
            data={favouriteList}
            keyExtractor={(item, index) => index.toString()} // Use index as key for dummy data
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
              >
                <DisplayFavouriteEntry plaster={item} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "linen",
    alignItems: "center",

    marginTop: 30,
    padding: 10,
    width: "100%",
  },
  searchContainer: {
    flexDirection: "column", // Stack child elements (input fields) vertically
    alignItems: "center", // Center all child elements horizontally
    // justifyContent: "space-around",
    marginVertical: 20, // Add vertical spacing to the container
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,

    width: "100%",
    // Border styles
    // borderWidth: 0.5, // Border width
    borderColor: "#000", // Border color (black in this case)

    // Shadow styles for both iOS and Android
    shadowColor: "#000", // Shadow color (black)
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (horizontal, vertical)
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow radius (blur effect)

    // For Android elevation (required for Expo as well)
    elevation: 5, // Elevation for Android shadow
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
    width: "80%",
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default FavouritesModal;
