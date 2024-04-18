import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { appw } from "@/api/appwrite";
import { AppwriteProvider } from "@/components/providers";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	initialRouteName: "(app)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	if (!loaded) return null;
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<AppwriteProvider>
			<ThemeProvider value={DarkTheme}>
				<Stack>
					<Stack.Screen name="(app)" options={{ headerShown: false }} />
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="auth/signup/email" options={{ headerShown: false }} />
					<Stack.Screen name="auth/signin" options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
		</AppwriteProvider>
	);
}
