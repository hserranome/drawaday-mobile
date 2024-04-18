import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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

export const CTALinkButton = ({ label, href }: { label?: string; href: string }) => {
	return (
		<View style={styles.button}>
			<Link href={href as any} asChild>
				<Pressable android_ripple={{ color: "#f0f", borderless: true }}>
					<Text style={styles.buttonText}>{label}</Text>
				</Pressable>
			</Link>
		</View>
	);
};
