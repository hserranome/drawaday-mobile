import { Image, StyleSheet, View } from "react-native";

import { Text } from "@/components/elements/Themed";
import { CTALinkButton } from "@/components/elements/CTALinkButton";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

export default function IndexScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.background}>
				<Image source={require("../../assets/images/welcome-bg.png")} style={styles.backgroundImage} />
				<LinearGradient
					colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
					style={styles.backgroundOverlay}
				/>
			</View>
			<View style={styles.topContainer}>
				<Text style={styles.title}>Drawaday</Text>
			</View>
			<View style={styles.bottomContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.text}>Share your progress,</Text>
					<Text style={styles.text}>with a drawing every day.</Text>
				</View>
				<View style={styles.buttonContainer}>
					<CTALinkButton href="auth/email/signup" label="Sign up with email" />
					<View style={styles.divider} />
					<CTALinkButton href="auth/email/signin" label="Already have an account? Sign in instead." />
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
	background: {
		position: "absolute",
		width: "100%",
		height: "90%",
		bottom: 0,
	},
	backgroundImage: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	backgroundOverlay: {
		position: "absolute",
		width: "100%",
		height: "100%",
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
