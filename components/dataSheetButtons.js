import React from "react"; // React import for functional component creation
import {
  SafeAreaView, // Ensures content avoids system UI elements (e.g., notch, status bar)
  View, // Container component for layout
  Text, // Component for displaying text
  TextInput, // Component for user input fields
  StyleSheet, // Utility for creating custom styles
  Keyboard, // Utility to handle keyboard behavior (e.g., dismissing it)
} from "react-native";

// Importing custom components
import LabeledTextInput from "./textInput"; // Custom text input with a label
import SubmitButton from "./submitButton"; // Custom button component

export default function DataSheetButtons(selectedPlaster) {
  return (
    <View style={styles.container}>
      <SubmitButton title="View SDS" />
      <SubmitButton title="View TDS" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    // Shadow styles for both iOS and Android
    shadowColor: "#000", // Shadow color (black)
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (horizontal, vertical)
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow radius (blur effect)

    // For Android elevation (required for Expo as well)
    elevation: 5, // Elevation for Android shadow
  },
});
