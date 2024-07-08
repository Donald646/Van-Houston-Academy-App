import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

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
    <SafeAreaView className="flex-1 max-w-full p-2 bg-white">
      <View className="h-1/2 flex items-left max-w-full justify-start p-4">
        <Text className="text-4xl text-center text-blue-800 w-full font-bold mb-[5vh]">
          Sign Up
        </Text>

        <View className="flex flex-col gap-2">
          <Text className="mb-1 text-[#cc0000] font-bold">{message}</Text>
          <View>
            <TextInput
              className="border-[1px] shadow-sm bg-white border-[#e5e6e8] h-12 w-full rounded-md"
              onChangeText={(newText) => {
                setUsername(newText);
              }}
              placeholder="Username Here"
              value={username}
              selectionColor="black" // Very light selection color
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              mode="flat"
              left={
                <TextInput.Icon
                  icon={() => (
                    <FontAwesome name="user" size={24} color="black" />
                  )}
                />
              }
            />
          </View>
          <View>
            <TextInput
              className="border-[1px] h-12 w-full shadow-sm border-[#e5e6e8] rounded-md bg-white"
              onChangeText={(newText) => {
                setEmail(newText);
              }}
              placeholder="Enter your Email"
              value={email}
              selectionColor="black" // Very light selection color
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              mode="flat"
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons name="email" size={24} color="black" />
                  )}
                />
              }
            />
          </View>

          <View>
            <TextInput
              theme={{ colors: { primary: "black" } }}
              className="border-[1px] w-1/2 w-full h-12 mt-2 shadow-sm border-[#e5e6e8] rounded-md bg-white"
              onChangeText={(newText) => {
                setPassword(newText);
              }}
              selectionColor="black" // Very light selection color
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              placeholder="Password"
              value={password}
              left={
                <TextInput.Icon
                  icon={() => (
                    <FontAwesome name="lock" size={24} color="black" />
                  )}
                />
              }
              secureTextEntry={true}
            />
          </View>
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
