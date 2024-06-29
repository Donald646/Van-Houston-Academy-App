import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { userInfo } from "../../utils/functions/userInfo";

export default function TabLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await userInfo();
        setUser(info);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

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
          title: "Announcements",
          tabBarLabel: "Announcements",
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin Panel",
          tabBarLabel: "Admin",
          tabBarStyle: "hidden",
          href: user?.role != "admin" ? null : "/(protected)/admin",
        }}
      />
    </Tabs>
  );
}
