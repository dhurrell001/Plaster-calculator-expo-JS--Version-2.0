import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { searchPlastersByQuery } from "./database";
import { AppContext } from "./appMainContext";

// Debounce helper, this the amount if queries sent to the database
// to avoid flooding the database with requests while the user is typing.
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const SearchPlasterComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const debouncedSearchText = useDebounce(searchText, 300);

  const { setSelectedPlaster } = useContext(AppContext);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchText.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        const results = await searchPlastersByQuery(debouncedSearchText);
        setSuggestions(results);
      } catch (error) {
        console.error("Search failed", error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchText]);

  const handleSelect = (plaster) => {
    setSelectedPlaster(plaster);
    setSearchText(plaster.plasterName);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search for a plaster:</Text>
      <TextInput
        style={styles.input}
        placeholder="Start typing..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={styles.item}
          >
            <Text>{item.plasterName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});

export default SearchPlasterComponent;
