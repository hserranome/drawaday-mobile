import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { CTALinkButton } from "@/components/elements/CTALinkButton";

export default function SignUpScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign Up</Text>
			<CTALinkButton href="../auth/signup/email" label="Sign up with email" />
			<CTALinkButton href="../auth/signin" label="Already have an account? Sign in instead." />
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
