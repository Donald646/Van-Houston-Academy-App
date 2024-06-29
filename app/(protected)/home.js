import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userInfo } from "../../utils/functions/userInfo";
import Announcement from "../../components/Announcement";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await userInfo();
        setUser(info);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="p-[1vh] pt-[5vh] h-full bg-white">
      <Text className="font-medium text-3xl">
        Welcome Back, {user ? user.username : "No user info available"}!
      </Text>
      <View className=" flex flex-col mt-[4vh]">
        <Text className="text-xl font-semibold">Latest Announcements</Text>

        <Announcement
          title={"Summer Festival"}
          date={"june 24, 2024"}
          content={
            "Join us for the annual Summer Festival next week! Food, games, and performances from 3PM to 8PM."
          }
          author={"Donald Chu"}
        />
        <Announcement
          title={"Summer Festival"}
          date={"june 24, 2024"}
          content={
            "Join us for the annual Summer Festival next week! Food, games, and performances from 3PM to 8PM."
          }
          author={"Donald Chu"}
        />
      </View>
    </SafeAreaView>
  );
}
