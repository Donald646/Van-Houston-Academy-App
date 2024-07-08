import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userInfo } from "../../utils/functions/userInfo";
import Announcement from "../../components/Announcement";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../utils/functions/formatDate";
import { fetchPostsAndProfiles } from "../../utils/functions/fetchPostsAndProfiles";
import { useFocusEffect } from "expo-router";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  const fetchUserInfo = async (supabase) => {
    try {
      const info = await userInfo(supabase);
      setUser(info);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    //await fetchUserInfo();
    await fetchPostsAndProfiles(supabase, setError, setAnnouncements, "home");
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostsAndProfiles(supabase, setError, setAnnouncements, "home").then(
      () => setRefreshing(false)
    );
  }, []);

  const renderItem = ({ item }) => (
    <Announcement
      title={item.title}
      date={formatDate(item.created_at)}
      content={item.content}
      author={item.username}
      postId={item.announcement_id}
    />
  );

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListHeaderComponent={() => (
          <View className="pt-12">
            <Text className="font-medium text-3xl">
              Welcome Back, {user ? user.username : "No user info available"}!
            </Text>
            <View className="flex flex-col mt-[4vh]">
              <Text className="text-xl font-semibold">
                Latest Announcements
              </Text>
            </View>
            {error && <Text>{error}</Text>}
          </View>
        )}
        ListFooterComponent={() => <Text></Text>}
        data={announcements}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
