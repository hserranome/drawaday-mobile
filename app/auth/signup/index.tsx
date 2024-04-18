import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { CTALinkButton } from "@/components/elements/CTALinkButton";

export default function SignUpScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.text}>Share your progress,</Text>
				<Text style={styles.text}>with a drawing every day.</Text>
			</View>
			<View style={styles.buttonContainer}>
				<CTALinkButton href="../auth/signup/email" label="Continue with email" />
				<View style={styles.divider} />
				<CTALinkButton href="../auth/signin" label="Already have an account? Sign in instead." />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 40,
	},
	titleContainer: {
		marginBottom: 20,
	},
	text: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
	},
	buttonContainer: {
		width: "90%",
		gap: 10,
	},
	divider: {
		marginVertical: 10,
		height: 1,
		width: "50%",
		alignSelf: "center",
		borderColor: "gray",
		borderWidth: 0.5,
	},
});
