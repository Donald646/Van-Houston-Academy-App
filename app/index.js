import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { userInfo } from "../utils/functions/userInfo";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await userInfo(supabase);
        setUser(info);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return <Redirect href={user ? "/home" : "/authentication"} />;
}
