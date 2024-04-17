import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function SignUpScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign Up</Text>

			<Link href="/signin" asChild>
				<Button title="Already have an account? Sign in here." />
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
