import { Text, Pressable, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { supabase } from "../lib/supabase";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from 'expo-router';
import { useState } from "react";

export default function Announcement({title, date, content, author, postId}) {
  const [isDisabled, setIsDisabled] = useState(false)
  const toast = useToast()
  const navigation = useNavigation()
const handleDelete = async() =>{
const response = await supabase.from("announcements").delete().eq("announcement_id", postId)
console.log(postId)
console.log(response)
if(response.error){
  toast.error(response.error)
}else{
toast.show("Successfully Deleted Announcement")
}
}
  
  return (
<View className="rounded-lg p-4 flex-1 bg-white text-black mt-[1.5vh] flex flex-col p-4 border-[.75px] border-[#e5e6e8] shadow-sm" activeOpacity={.4}>
  <Pressable className="ml-auto" onPress={handleDelete} disabled={isDisabled}>
  <Feather name="trash" size={20} color="red" />
  </Pressable>
<Text className="text-lg font-bold">{title}</Text>
<Text className="text-sm text-gray-500 font-semibold">{author} • {date}</Text>
<Text className="mt-2 font-lightbold">{content}</Text>
</View>
  
  )
}
