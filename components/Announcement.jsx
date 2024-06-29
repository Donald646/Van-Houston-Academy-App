import { Text, Pressable, TouchableOpacity } from "react-native";

export default function Announcement({title, date, content, author}) {
  return (
<TouchableOpacity className="shadow-md p-4 rounded-lg bg-white text-black mt-[1.5vh]">
<Text className="text-lg">{title}</Text>
<Text className="text-sm text-gray-500">{author} • {date}</Text>
<Text className="mt-2">{content}</Text>
</TouchableOpacity>
  )
}
