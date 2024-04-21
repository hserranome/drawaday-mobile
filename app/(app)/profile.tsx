import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { Button } from "@/components/elements/Button";
import { useContext } from "react";
import { AppwriteContext } from "@/components/providers";

export default function ProfileScreen() {
	const { logOut } = useContext(AppwriteContext);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<Button label="Sign Out" onPress={logOut} />
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
