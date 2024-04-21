import { Slot } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	topContainer: {
		width: "100%",
		position: "absolute",
		alignSelf: "center",
		top: 0,
		paddingTop: 80,
		alignItems: "center",
	},
	title: {
		fontSize: 64,
		fontWeight: "bold",
		color: Colors.text,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 20,
	},
});

export default function AuthLayout() {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Slot />
			</View>
			<View style={styles.topContainer}>
				<Text style={styles.title}>Drawaday</Text>
			</View>
		</View>
	);
}
