import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { Button } from "@/components/elements/Button";
import { useCallback } from "react";
import { appw } from "@/api/appwrite";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
	const router = useRouter();

	const logout = useCallback(async () => {
		try {
			await appw.account.deleteSession("current");
			router.replace("/");
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<Button label="Sign Out" onPress={logout} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
