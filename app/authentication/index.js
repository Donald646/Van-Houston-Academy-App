import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
  const router = useRouter();
  return (
    <SafeAreaView className="h-full bg-white">
      <Pressable onPress={() => router.push("/home")}>
        <Text>Dev ONLY</Text>
      </Pressable>
      <View className="h-2/3 items-center justify-center">
        <Text className="text-black text-4xl font-extrabold text-[#ae2833] font-serif text-center">
          Van Houston <Text className="text-[#252e59]">Academy</Text>
        </Text>
      </View>
      <View className="flex-column h-1/3 items-center justify-center p-3 gap-2 ">
        <Pressable
          activeOpacity={1}
          className="w-full justify-center items-center rounded-md bg-[#dc2627] active:bg-[#272e3c]"
          onPress={() => router.push("/authentication/login")}
        >
          <Text className="flex w-full text-center text-xl p-2 text-white font-semibold">
            Log In
          </Text>
        </Pressable>
        <TouchableOpacity
          activeOpacity={1}
          className="w-full justify-center items-center border-[.5px] active:bg-gray-200 rounded-md"
          onPress={() => router.push("/authentication/signup")}
        >
          <Text className="text-xl p-2 flex w-full text-center font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
