import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";

export default function CreateScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create</Text>
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
});
