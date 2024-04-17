import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function SignInScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>SignIn Up</Text>

			<Link href="/signup" asChild>
				<Button title="No account? Sign up instead." />
			</Link>
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
