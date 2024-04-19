import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { Button } from "@/components/elements/Button";
import { useCallback, useContext } from "react";
import { appw } from "@/api/appwrite";
import { useRouter } from "expo-router";
import { AppwriteContext } from "@/components/providers";

export default function ProfileScreen() {
	const router = useRouter();
	const { logout } = useContext(AppwriteContext);

	const signout = useCallback(async () => {
		logout();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<Button label="Sign Out" onPress={signout} />
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
