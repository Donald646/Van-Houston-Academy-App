import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
  return (
    <SafeAreaView className="h-full bg-red-400">
      <View className="h-2/3 items-center justify-center">
        <Text className="text-black text-4xl">Van Houston Academy</Text>
      </View>
      <View className="flex-column h-1/3 items-center justify-center p-3 gap-2">
        <TouchableOpacity className="w-full justify-center items-center border-2 rounded-md">
          <Link href="/authentication/login" className="text-xl w-full p-2">
            <Text className="flex w-full text-center">Login</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity className="w-full justify-center items-center border-2 rounded-md">
          <Link href="/authentication/signup" className="text-xl w-full p-2 ">
            <Text className="flex w-full text-center">Signup</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
