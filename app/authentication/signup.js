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
  const router = useRouter();
  //const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (!error) {
      console.log("success");
      router.replace("/(protected)/home");
    } else {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 max-w-full p-2">
      <View className="h-1/2 flex items-left max-w-full justify-start p-4">
        <Text className="text-3xl text-center text-black w-full mb-20 font-semibold">
          Sign Up
        </Text>

        <Text className="mb-1 text-[#cc0000]">{message}</Text>
        <TextInput
          className="border-2 h-12 w-full rounded-md p-2"
          onChangeText={(newText) => {
            setEmail(newText);
          }}
          placeholder="example@egmail.com"
          value={email}
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

        <TouchableOpacity
          className="flex items-center mt-5 w-full h-10 justify-center rounded-md bg-[#dc2627] active:opacity-50"
          onPress={handleSignup}
        >
          <Text className="text-xl text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
