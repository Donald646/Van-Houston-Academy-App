import { Stack } from "expo-router";
import BackButton from "../../components/BackButton";

export default function Root() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
            backgroundColor: "transparent",
          },
          headerShown: false,
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true, title:"", headerLeft:({ color }) => (
            <BackButton size={30} color={color}/>
          )}} />
<Stack.Screen name="createAnnouncement" options={{ headerShown: true, title:"", presentation:"modal" }} />
    </Stack>
  );
}
