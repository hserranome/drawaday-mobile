import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, Tabs, useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/utils/useClientOnlyValue";
import { CreateModal } from "@/components/elements/CreateModal";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function AppLayout() {
	const [createModalVisible, setCreateModalVisible] = useState(false);

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
						tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="empty"
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => <TabBarIcon name="plus-square-o" color={color} />,
					}}
					listeners={() => ({
						tabPress: (e) => {
							e.preventDefault();
							setCreateModalVisible(true);
						},
					})}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						tabBarIcon: ({ color }) => <TabBarIcon name="pencil-square" color={color} />,
					}}
				/>
			</Tabs>
			{createModalVisible && <CreateModal onClose={() => setCreateModalVisible(false)} />}
		</>
	);
}
