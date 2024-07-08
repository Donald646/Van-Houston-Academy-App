import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Announcement from "../../components/Announcement";
import { useFocusEffect, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { getStudentCount } from "../../utils/functions/getStudentCount";
import { fetchPostsAndProfiles } from "../../utils/functions/fetchPostsAndProfiles";
import { FlatList } from "react-native";
import { formatDate } from "../../utils/functions/formatDate";

export default function Admin() {
  const router = useRouter();
  const [studentCount, setStudentCount] = useState(0);
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = () => {
    fetchPostsAndProfiles(supabase, setError, setAnnouncements, "admin");
    setStudentCount(getStudentCount(supabase));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostsAndProfiles(supabase, setError, setAnnouncements, "admin").then(
      () => setRefreshing(false)
    );
  }, []);

  return (
    <SafeAreaView className="h-screen bg-white">
      <ScrollView
        className="flex-1 p-[1vh] pt-[5vh]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="text-2xl font-bold mb-8">Admin Dashboard</Text>
        <View className="flex flex-col gap-8">
          <View className="flex flex-col rounded-lg p-4 border-[.75px] border-[#e5e6e8] shadow-sm bg-white ">
            <View className="flex flex-row gap-2">
              <FontAwesome6 name="users" size={24} color="black" />
              <Text className="text-lg font-semibold">Student Count</Text>
            </View>
            <Text className="text-4xl font-bold mt-[1vh]">{studentCount}</Text>
          </View>

          <View className="border-[.75px] border-[#e5e6e8] p-4 rounded-lg shadow-sm bg-white">
            <Text>{error}</Text>
            <Text className="text-xl font-semibold mb-4">Recently Posted</Text>
            {announcements.map((item, index) => (
              <Announcement
                key={index}
                title={item.title}
                date={formatDate(item.created_at)}
                content={item.content}
                author={item.username}
                postId={item.announcement_id}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => router.push("/modals/createAnnouncement")}
        className="absolute bottom-[10vh] right-[2vh] bg-[#111827] rounded-full w-16 h-16 items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
