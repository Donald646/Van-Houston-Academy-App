import { useState } from 'react'
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import { supabase } from '../../lib/supabase'
import { userInfo } from '../../utils/functions/userInfo'
import { useRouter } from 'expo-router'

export default function optionalmodal() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const handleCreate = async() =>{
    const user = await userInfo(supabase)

    if(!title || !content){
setError("Please Fill in All Fields")
setTimeout(() => {
  setError("");
}, 5000);
return
    }
    const { error} = await supabase.from("announcements").insert({title:title, content:content, creator_id:user.user_id})

if(error){
  setError(error.message)
  setTimeout(() => {
    setError("");
  }, 5000);

}else{
  router.back()
}
  }
  return (
    <SafeAreaView>
      <Text className="text-2xl text-center font-bold">Create a Announcement</Text>
      <View className="flex p-5">
      <Text className="text-md text-red-700">{error}</Text>

      <Text className="text-lg font-semibold">Announcement Title</Text>
      <TextInput
      className=" h-12 w-full rounded-md p-2 shadow-md bg-white"
      onChangeText={(newText) => {
        setTitle(newText);
      }}
      placeholder="Enter the Title of The Post"
      value={title}

      />
<Text className="text-lg font-semibold mt-[1vh]">Announcement Body</Text>
<TextInput
      className="shadow-md h-24 w-full rounded-md bg-white p-2 "
      onChangeText={(newText) => {
        setContent(newText);
      }}
      placeholder="Enter the Description"
      value={content}
      multiline = {true}
numberOfLines = {4}
      />
      </View>
      <TouchableOpacity className="bg-[#4f47e5] p-2 mx-5 rounded-lg" onPress={handleCreate}><Text className='text-white text-lg text-center'>Create Announcement</Text></TouchableOpacity>
    </SafeAreaView>
  )
}