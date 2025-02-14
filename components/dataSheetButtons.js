import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SubmitButton from "./submitButton";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { Linking } from "react-native";
const openPdfInBrowser = async (fileName) => {
  try {
    const pdfRef = ref(storage, fileName);
    const url = await getDownloadURL(pdfRef);
    console.log("PDF Download URL:", url);

    await Linking.openURL(url); // Alternative method
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
};

export default function DataSheetButtons({ selectedPlaster }) {
  console.log(selectedPlaster);
  return (
    <View style={styles.container}>
      <SubmitButton
        title="View SDS"
        onPress={() => openPdfInBrowser("MultiFinishTDS.pdf")}
      />
      <SubmitButton
        title="View TDS"
        onPress={() => openPdfInBrowser("anotherFile.pdf")}
      />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
