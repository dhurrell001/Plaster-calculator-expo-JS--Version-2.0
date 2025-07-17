import { useContext } from "react";
import { AppContext } from "./appMainContext";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addPlasterToFavourites,
  removePlasterFromFavourites,
} from "./database";
export default function FavouritesButton({ selectedPlaster }) {
  const {
    favouriteList,
    setFavouriteList,

    setSelectedPlaster,
  } = useContext(AppContext);
  //  favourlist.some checks each item in the favouriteList to see if it matches the selectedPlaster
  // If it does, isFavourite will be true, otherwise false.
  const isFavourite = favouriteList.some((p) => p.id === selectedPlaster.id);

  // This function toggles the favourite status of the selected plaster. it
  // updates the plasters database faborites field and the local favourites list.
  const toggleFavourite = async () => {
    if (isFavourite) {
      await removePlasterFromFavourites(selectedPlaster.id);
      // Create a new list execpt the plaster that matches the selectedPlaster id
      // This will remove the plaster from the favourites list
      setFavouriteList((prev) =>
        prev.filter((p) => p.id !== selectedPlaster.id)
      );
      setSelectedPlaster({ ...selectedPlaster, isFavourite: false });
    } else {
      await addPlasterToFavourites(selectedPlaster.id);
      const alreadyExistInFavourites = favouriteList.some(
        (p) => p.id === selectedPlaster.id
      );
      if (!alreadyExistInFavourites) {
        setFavouriteList((prev) => [...prev, selectedPlaster]);
      }
      setSelectedPlaster({ ...selectedPlaster, isFavourite: true });
    }
  };
  return (
    <TouchableOpacity onPress={toggleFavourite} style={styles.iconButton}>
      {isFavourite ? (
        <FontAwesome name="heart" size={35} color="red" />
      ) : (
        <MaterialCommunityIcons name="heart-outline" size={35} color="gray" />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  iconButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
