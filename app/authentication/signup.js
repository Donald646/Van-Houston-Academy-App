import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 max-w-full bg-red-400 p-2">
      <View className="h-1/2 flex items-left max-w-full justify-start p-4">
        <Text className="text-3xl text-center text-black w-full mb-20">
          Sign Up
        </Text>
        <TextInput
          className="border-2 h-12 w-full rounded-md p-2"
          onChangeText={(newText) => {
            setUsername(newText);
          }}
          placeholder="Username"
          value={username}
        />
        <TextInput
          className="border-2 w-1/2 w-full h-12 mt-2 rounded-md p-2"
          onChangeText={(newText) => {
            setPassword(newText);
          }}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          className="border-2 w-1/2 w-full h-12 mt-2 rounded-md p-2"
          onChangeText={(newText) => {
            setPassword(newText);
          }}
          placeholder="Re-enter Password"
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity
          disabled={true}
          className="flex items-center mt-5 w-full border-2 h-10 justify-center rounded-md"
        >
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
