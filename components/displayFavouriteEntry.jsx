import react from "react";
import React, { useContext } from "react";
import { AppContext } from "./appMainContext";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function DisplayFavouriteEntry({ plaster }) {
  const { setSelectedPlaster, selectedPlaster, setFavouriteList } =
    useContext(AppContext);

  const handleDelete = (plaster) => {
    setFavouriteList((prev) => prev.filter((p) => p.id !== plaster.id));
  };
  return (
    <View style={styles.favoriteEntry}>
      <Text>{plaster.plasterName}</Text>

      <TouchableOpacity onPress={() => handleDelete(plaster)}>
        <Feather name="trash-2" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteEntry: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
});
