import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const AboutPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>About the Plaster Calculator</Text>
        <Text style={styles.paragraph}>
          Welcome to the Plaster Calculator! This handy tool is here to help you
          plan your plastering projects—whether you’re cozy inside or wet
          outside! You’ll find a wide range of plasters and renders to choose
          from.
        </Text>
        <Text style={styles.paragraph}>
          The Contingency Option lets you adjust for real-world scenarios (we
          know manufacturers can sometimes be a tad optimistic about coverage!).
          Just set your contingency level, and the Plaster Calculator will add a
          little extra to make sure you’re covered.
        </Text>
        <Text style={styles.paragraph}>
          To be as accurate as possible all calculations are based on
          manufacturer technical data sheet information
        </Text>
        <Text style={styles.paragraph}>Happy spreading!</Text>
        <Text style={styles.paragraph}>
          © 2024 David Hurrell. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    flexGrow: 1,
    backgroundColor: "linen",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "90%", // Keeps it slightly smaller than the screen width
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },

  paragraph: {
    fontSize: 18,
    lineHeight: 22,
    color: "#666",
    marginBottom: 10,
  },
});

export default AboutPage;
