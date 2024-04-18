import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
	errorMessage: {
		fontSize: 12,
		color: "red",
	},
});

type ErrorMessageProps = {
	message?: string;
};
export const ErrorMessage = ({ message }: ErrorMessageProps) =>
	message && <Text style={styles.errorMessage}>{message}</Text>;
