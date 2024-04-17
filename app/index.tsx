import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

const Button = ({ label, href }: { label?: string; href: string }) => {
	return (
		<View style={buttonStyles.button}>
			<Link href={href as any} asChild>
				<Pressable android_ripple={{ color: "#f0f", borderless: true }}>
					<Text style={buttonStyles.buttonText}>{label}</Text>
				</Pressable>
			</Link>
		</View>
	);
};

const buttonStyles = StyleSheet.create({
	button: {
		width: "100%",
		backgroundColor: "#f0f0f0",
		paddingVertical: 10,
		borderRadius: 1000,
		overflow: "hidden",
	},
	buttonText: {
		color: "#000",
		width: "100%",
		textAlign: "center",
		fontSize: 20,
	},
});

export default function IndexScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Drawaday</Text>
			<View style={styles.footer}>
				<Button href="/signup" label="Continue" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		position: "absolute",
		top: "20%",
		fontSize: 64,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	footer: {
		width: "100%",
		position: "absolute",
		bottom: 40,
		paddingHorizontal: 20,
	},
});
