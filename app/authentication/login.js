import { View, Text, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) {
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
          Welcome Back!
        </Text>

        <Text className="mb-1 text-[#cc0000]">{message}</Text>
        <TextInput
          className="border-[1px] h-12 w-full rounded-md bg-white"
          onChangeText={setEmail}
          placeholder="Enter your Email"
          value={email}
          selectionColor="black"
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
        <TextInput
          theme={{ colors: { primary: "black" } }}
          className="border-[1px] w-full h-12 mt-2 rounded-md bg-white"
          onChangeText={setPassword}
          selectionColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder="Password"
          value={password}
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="lock" size={24} color="black" />}
            />
          }
          secureTextEntry={true}
        />
        <Link href="/authentication/forget">
          <Text className="underline text-blue-600">Forgot your password?</Text>
        </Link>

        <Pressable
          className="flex items-center mt-5 w-full h-10 justify-center rounded-md bg-[#dc2627] active:opacity-50"
          onPress={handleLogin}
        >
          <Text className="text-xl text-white">Log In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
