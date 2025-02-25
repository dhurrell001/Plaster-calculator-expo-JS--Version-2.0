import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SubmitButton from "./submitButton";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { Linking } from "react-native";

/*Finction to open PDF in browser, retrieves the download URL from Firebase Storage
and opens the URL in the browser fileName: the name of the file in 
Firebase Storage to open */

const openPdfInBrowser = async (fileName) => {
  try {
    const pdfRef = ref(storage, fileName); // Create a reference to the PDF file in Firebase Storage
    const url = await getDownloadURL(pdfRef); // Get the download URL for the PDF
    console.log("PDF Download URL:", url);

    await Linking.openURL(url); // Open the PDF in the browser
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
};

/* Component to display buttons for viewing TDS and SDS, uses selectedPlaster prop
to determine which plaster's TDS and SDS to display */

export default function DataSheetButtons({ selectedPlaster }) {
  console.log(selectedPlaster);
  console.log(selectedPlaster.tdsFileName);
  return (
    <View style={styles.container}>
      <SubmitButton
        title="View TDS"
        onPress={() => openPdfInBrowser(selectedPlaster?.tdsFileName)}
      />
      <SubmitButton
        title="View SDS"
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
