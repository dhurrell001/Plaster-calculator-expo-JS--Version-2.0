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
import { getPlasters } from "../components/database";
import { AppContext } from "../components/appMainContext";

const PlasterSearchModal = ({ visible, onClose }) => {
  const { setSelectedPlaster } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlasters, setFilteredPlasters] = useState([]);

  useEffect(() => {
    const fetchAndFilter = debounce(async () => {
      const all = await getPlasters();
      const filtered = all.filter((p) =>
        p.plasterName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlasters(filtered);
    }, 300); // Debounce 300ms

    if (searchQuery.trim() !== "") {
      fetchAndFilter();
    } else {
      setFilteredPlasters([]);
    }

    return () => fetchAndFilter.cancel(); // cleanup debounce
  }, [searchQuery]);

  const handleSelect = (plaster) => {
    setSelectedPlaster(plaster);
    setSearchQuery(""); // Clear search input
    onClose(); // Close modal
  };
  // Reset when modal is closed
  useEffect(() => {
    if (!visible) {
      setSearchQuery("");
      setFilteredPlasters([]);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Search for a Plaster</Text>
          <TextInput
            style={styles.input}
            placeholder="Type plaster name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredPlasters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
              >
                <Text>{item.plasterName}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text>Cancel</Text>
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
    padding: 40,
    width: "100%",
  },
  searchContainer: {
    flexDirection: "column", // Stack child elements (input fields) vertically
    alignItems: "center", // Center all child elements horizontally
    // justifyContent: "space-around",
    marginVertical: 20, // Add vertical spacing to the container
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 15,

    width: "90%",
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

export default PlasterSearchModal;
