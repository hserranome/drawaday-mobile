import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { AppwriteProvider } from "@/components/providers";
import { SafeAreaProvider } from "react-native-safe-area-context";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	initialRouteName: "app",
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
		<SafeAreaProvider>
			<AppwriteProvider>
				<ThemeProvider value={DarkTheme}>
					<Stack screenOptions={{ headerShown: false }} />
				</ThemeProvider>
			</AppwriteProvider>
		</SafeAreaProvider>
	);
}
