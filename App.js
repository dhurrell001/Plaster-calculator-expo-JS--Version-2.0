import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppMain from "./components/appMain";
import AboutPage from "./components/aboutPage";
import InstructionPage from "./components/instructionPage";
import { Ionicons } from "@expo/vector-icons";
import { AppProvider } from "./components/appMainContext";
import PlasterSearchModal from "./components/plasterSearchModal";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

//Set up the bottom tab navigator
const Tab = createBottomTabNavigator();
// Navigation container for the app, with a bottom tab navigator
// to switch between the main calculator page, the instructions page,
// and the about page

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

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
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "darkgrey",
            tabBarInactiveTintColor: "slategrey",
            tabBarLabelStyle: { fontSize: 14 }, // Adjust font size here
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
        </Tab.Navigator>

        {/* Modal for plaster search */}
        <PlasterSearchModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </NavigationContainer>
    </AppProvider>
  );
}
// Dummy screen component (won't actually be shown)
const DummyScreen = () => <View />;
