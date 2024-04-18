import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { CTALinkButton } from "@/components/elements/CTALinkButton";

export default function IndexScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Drawaday</Text>
			<View style={styles.footer}>
				<CTALinkButton href="/auth/signup" label="Continue" />
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
