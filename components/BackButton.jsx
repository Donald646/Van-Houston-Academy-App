import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function BackButton({size, color}) {
const router = useRouter()
  return (
    <TouchableOpacity onPress={()=> router.back()} activeOpacity={1}>
        <Ionicons name="chevron-back" size={size} color={color} />
    </TouchableOpacity>
  )
}