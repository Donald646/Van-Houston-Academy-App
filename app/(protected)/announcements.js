import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import Announcement from "../../components/Announcement";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../utils/functions/formatDate";
import { fetchPostsAndProfiles } from "../../utils/functions/fetchPostsAndProfiles";
import { useFocusEffect } from "expo-router";

export default function Announcements() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const fetchData = async () => {
    fetchPostsAndProfiles(supabase, setError, setAnnouncements);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostsAndProfiles(supabase, setError, setAnnouncements).then(() =>
      setRefreshing(false)
    );
  }, []);

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(search.toLowerCase()) ||
      announcement.content.toLowerCase().includes(search.toLowerCase()) ||
      announcement.username.toLowerCase().includes(search.toLowerCase())
  );

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
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="p-4 pt-12 h-screen bg-white">
      <Text className="text-2xl font-bold">All Announcements</Text>
      <View className="flex flex-row items-center justify-content border-[1px] border-[#e5e6e8] bg-white rounded-md mt-3">
        <EvilIcons name="search" size={30} color="black" className="" />
        <TextInput
          placeholder="Search Announcements..."
          className="p-2 shadow-sm font-semibold bg-white flex-1 rounded-r-md"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {error && <Text className="text-lg text-red-700">{error}</Text>}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredAnnouncements}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
