import { Slot } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

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
		alignItems: "center",
	},
	topGradient: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},
	title: {
		fontSize: 64,
		fontWeight: "bold",
		color: Colors.text,
		marginTop: 80,
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
				<LinearGradient colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.8)", "transparent"]} style={styles.topGradient} />
				<Text style={styles.title}>Drawaday</Text>
			</View>
		</View>
	);
}
