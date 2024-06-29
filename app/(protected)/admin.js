import { View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Admin() {
  return (
    <SafeAreaView className="p-[1vh] pt-[5vh] h-full bg-white">
      <Text className="text-2xl font-semibold">Admin Panel</Text>
    </SafeAreaView>
  );
}
