import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppMain from "./components/appMain";
import AboutPage from "./components/aboutPage";
import FavouritesPage from "./components/favouritesPage";
import InstructionPage from "./components/instructionPage";
import { Ionicons } from "@expo/vector-icons";
import { AppProvider } from "./components/appMainContext";
import PlasterSearchModal from "./components/plasterSearchModal";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import FavouritesModal from "./components/favoritesModal";

//Set up the bottom tab navigator
const Tab = createBottomTabNavigator();
// Navigation container for the app, with a bottom tab navigator
// to switch between the main calculator page, the instructions page,
// and the about page

export default function App() {
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [favouritesModalVisible, setFavouritesModalVisible] = useState(false);

  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="AppMain"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "AppMain") {
                iconName = "home-outline";
              } else if (route.name === "About") {
                iconName = "information-circle-outline";
              } else if (route.name === "Instructions") {
                iconName = "document-text-outline";
              } else if (route.name === "Search") {
                iconName = "search-outline";
              } else if (route.name === "Favourites") {
                iconName = "heart-outline";
              }
              return <Ionicons name={iconName} size={30} color={color} />;
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "darkgrey",
            tabBarInactiveTintColor: "slategrey",
            tabBarLabelStyle: { fontSize: 20 }, // Adjust font size here
            tabBarStyle: {
              height: 60,
              paddingBottom: 10,
              paddingTop: 5,
              borderTopColor: "black",
              backgroundColor: "antiquewhite",
            },
          })}
        >
          <Tab.Screen
            name="AppMain"
            component={AppMain}
            options={{ title: "Calculator" }}
          />
          <Tab.Screen name="Instructions" component={InstructionPage} />
          <Tab.Screen name="About" component={AboutPage} />
          <Tab.Screen
            name="Search"
            component={DummyScreen} // placeholder
            listeners={{
              tabPress: (e) => {
                e.preventDefault(); // prevent navigation
                setModalVisible(true); // open modal instead
              },
            }}
            options={{
              title: "Search",
              tabBarButton: (props) => <TouchableOpacity {...props} />,
            }}
          />
          <Tab.Screen
            name="Favourites"
            component={DummyScreen}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                setFavouritesModalVisible(true);
              },
            }}
            options={{
              title: "Favourites",
              tabBarButton: (props) => <TouchableOpacity {...props} />,
            }}
          />
        </Tab.Navigator>

        {/* Modal for plaster search */}
        <PlasterSearchModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <FavouritesModal
          visible={favouritesModalVisible}
          onClose={() => setFavouritesModalVisible(false)}
        />
      </NavigationContainer>
    </AppProvider>
  );
}
// Dummy screen component (won't actually be shown)
const DummyScreen = () => <View />;
