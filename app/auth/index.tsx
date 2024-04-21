import { StyleSheet, Text, View } from "react-native";

import { CTALinkButton } from "@/components/elements/CTALinkButton";
import Colors from "@/constants/Colors";
import { Button } from "@/components/elements/Button";
import { GradientOverlayImage } from "@/components/elements/GradientOverlayImage";

const styles = StyleSheet.create({
	titleContainer: {
		marginBottom: 20,
	},
	text: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
		color: Colors.text,
	},
	buttonsContainer: {
		width: "90%",
		gap: 10,
	},
	divider: {
		marginTop: 6,
		marginBottom: 4,
		height: 1,
		width: "50%",
		alignSelf: "center",
		borderColor: "gray",
		borderWidth: 0.5,
	},
});

export default function IndexScreen() {
	return (
		<>
			<GradientOverlayImage
				source={require("../../assets/images/auth/index-bg.png")}
				containerStyle={{ height: "94%", bottom: 0 }}
			/>
			<View style={styles.titleContainer}>
				<Text style={styles.text}>Share your progress,</Text>
				<Text style={styles.text}>with a drawing every day.</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<CTALinkButton href="auth/email/signup" label="Sign up with email" />
				<View style={styles.divider} />
				<Button
					href="auth/email/signin"
					containerStyle={{ backgroundColor: "transparent" }}
					textStyle={{ color: Colors.text, fontSize: 16 }}
					label="Already have an account? Sign in instead."
				/>
			</View>
		</>
	);
}
