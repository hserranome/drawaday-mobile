import { Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
	submitButton: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
	},
});

export type ButtonProps = { onPress?: () => void; disabled?: boolean };
export const Button = ({ onPress, disabled }: ButtonProps) => (
	<Pressable style={styles.submitButton} onPress={onPress} disabled={disabled}>
		<Text>Sign up</Text>
	</Pressable>
);
