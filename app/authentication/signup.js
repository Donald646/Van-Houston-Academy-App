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
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  //const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSignup = async () => {
    if (!password || !email || !username) {
      setMessage("Please Fill in All Fields!");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (!error) {
      router.replace("/(protected)/home");
      const { error } = await supabase
        .from("profiles")
        .insert({ user_id: data?.session.user.id, username: username });
      if (error) {
        console.log(error.message);
        setMessage("profile error:", error.message);
      }
    } else {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 max-w-full p-2">
      <View className="h-1/2 flex items-left max-w-full justify-start p-4">
        <Text className="text-4xl text-center text-blue-800 w-full font-bold mb-[5vh]">
          Sign Up
        </Text>

        <View className="flex flex-col gap-2">
          <Text className="mb-1 text-[#cc0000] font-bold">{message}</Text>
          <TextInput
            className="border-2 h-12 w-full rounded-md p-2"
            onChangeText={(newText) => {
              setUsername(newText);
            }}
            placeholder="Username Here"
            value={username}
          />
          <TextInput
            className="border-2 h-12 w-full rounded-md p-2"
            onChangeText={(newText) => {
              setEmail(newText);
            }}
            placeholder="example@egmail.com"
            value={email}
          />
          <TextInput
            className="border-2 w-1/2 w-full h-12 rounded-md p-2"
            onChangeText={(newText) => {
              setPassword(newText);
            }}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          className="flex items-center mt-5 w-full h-10 justify-center rounded-md bg-[#dc2627] active:opacity-50"
          onPress={handleSignup}
        >
          <Text className="text-xl text-white font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
