import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Announcement from "../../components/Announcement";

export default function Announcments() {
  const formatDate = (timestampz) => {
    const date = new Date(timestampz);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <SafeAreaView className="p-[1vh] pt-[5vh] h-full bg-white">
      <Text className="text-2xl font-semibold">All Announcments</Text>
    </SafeAreaView>
  );
}
