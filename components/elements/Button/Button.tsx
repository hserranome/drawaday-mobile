import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
	button: {
		width: "100%",
		backgroundColor: "#f0f0f0",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 1000,
		overflow: "hidden",
	},
	text: {
		color: "#000",
		width: "100%",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
	},
});

export type ButtonProps = {
	label?: string;
	onPress?: () => void;
	disabled?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
};
export const Button = ({ label, onPress, disabled, containerStyle }: ButtonProps) => (
	<View style={containerStyle}>
		<Pressable style={styles.button} onPress={onPress} disabled={disabled}>
			<Text style={styles.text}>{label}</Text>
		</Pressable>
	</View>
);
