// components/favouritesPage.js
import React, { useContext } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { AppContext } from "./appMainContext";
import DisplayFavouriteEntry from "./displayFavouriteEntry";

export default function FavouritesPage() {
  const { favouriteList } = useContext(AppContext);

  return (
    <View style={styles.container}>
      {favouriteList.length === 0 ? (
        <Text style={styles.empty}>No favourites yet.</Text>
      ) : (
        <FlatList
          data={favouriteList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DisplayFavouriteEntry plaster={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "linen",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
    color: "gray",
  },
});
