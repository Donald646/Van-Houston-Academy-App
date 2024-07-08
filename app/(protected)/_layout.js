import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { userInfo } from "../../utils/functions/userInfo";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

export default function TabLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async (supabase) => {
      try {
        const info = await userInfo(supabase);
        setUser(info);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo(supabase);
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
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="announcements"
        options={{
          title: "Announcements",
          tabBarLabel: "Announcements",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="announcement" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="lunchmenu"
        options={{
          title: "Lunch",
          tabBarLabel: "Lunch",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin Panel",
          tabBarLabel: "Admin",
          tabBarStyle: "hidden",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="admin-panel-settings"
              size={size}
              color={color}
            />
          ),
          href: user?.role != "admin" ? null : "/(protected)/admin",
        }}
      />
    </Tabs>
  );
}
