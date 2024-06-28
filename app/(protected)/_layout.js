import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShown: false,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="announcements"
        options={{
          title: "Announc",
          tabBarLabel: "Announcements",
        }}
      />
    </Tabs>
  );
}
