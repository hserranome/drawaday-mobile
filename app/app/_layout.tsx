import { useContext, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, Tabs, useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/utils/useClientOnlyValue";
import { AppwriteContext } from "@/components/providers";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function AppLayout() {
	const { initialized } = useContext(AppwriteContext);
	const [createModalVisible, setCreateModalVisible] = useState(false);
	const router = useRouter();

	if (!initialized) return <></>;
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors.tint,
					// Disable static render of the header on web to prevent hydration error in React Navigation v6.
					headerShown: useClientOnlyValue(false, true),
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "",
						tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: "",
						headerShown: false,
						tabBarIcon: ({ color }) => <TabBarIcon name="plus-square-o" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "",
						tabBarIcon: ({ color }) => <TabBarIcon name="pencil-square" color={color} />,
					}}
				/>
			</Tabs>
		</>
	);
}
