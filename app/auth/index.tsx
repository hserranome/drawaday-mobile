import { Image, StyleSheet, Text, View } from "react-native";

import { CTALinkButton } from "@/components/elements/CTALinkButton";
import Colors from "@/constants/Colors";
import { Button } from "@/components/elements/Button";
import { GradientOverlayImage } from "@/components/elements/GradientOverlayImage";

export default function IndexScreen() {
	return (
		<View style={styles.container}>
			<GradientOverlayImage
				source={require("../../assets/images/auth/index-bg.png")}
				containerStyle={{ height: "90%", bottom: 0 }}
			/>
			<View style={styles.topContainer}>
				<Text style={styles.title}>Drawaday</Text>
			</View>
			<View style={styles.bottomContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.text}>Share your progress,</Text>
					<Text style={styles.text}>with a drawing every day.</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<CTALinkButton href="auth/email/signup" label="Sign up with email" />
					<View style={styles.divider} />
					<Button
						href="auth/email/signin"
						containerStyle={{ backgroundColor: "transparent", paddingVertical: 0 }}
						textStyle={{ color: Colors.text, fontSize: 16 }}
						label="Already have an account? Sign in instead."
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	topContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		position: "absolute",
		top: "20%",
		fontSize: 64,
		fontWeight: "bold",
		color: Colors.text,
	},
	bottomContainer: {
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
		color: Colors.text,
	},
	buttonsContainer: {
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
