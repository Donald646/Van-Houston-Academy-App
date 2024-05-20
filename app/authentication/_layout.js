import { Stack } from "expo-router";

export default function RootLayout() {
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
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ headerShown: true, title: "" }} />
      <Stack.Screen name="signup" options={{ headerShown: true, title: "" }} />
      <Stack.Screen name="forget" options={{ headerShown: true, title: "" }} />
    </Stack>
  );
}
