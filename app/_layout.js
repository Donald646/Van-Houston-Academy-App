import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

export default function Root() {
  return (
    <ToastProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="authentication" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
        <Stack.Screen
          name="modals"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
    </ToastProvider>
  );
}
