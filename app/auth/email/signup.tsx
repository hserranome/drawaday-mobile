import { StyleSheet } from "react-native";
import * as Crypto from "expo-crypto";

import { Text, View } from "@/components/elements/Themed";
import { useCallback, useContext } from "react";
import { appw } from "@/api/appwrite";
import { useForm } from "react-hook-form";
import { AppwriteException } from "react-native-appwrite/src";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { ErrorMessage } from "@/components/elements/ErrorMessage";
import { AppwriteContext } from "@/components/providers";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	content: {
		flex: 1,
		justifyContent: "flex-end",
		width: "90%",
		marginBottom: 40,
	},
	title: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	form: {
		marginBottom: 20,
	},
	inputContainer: {
		marginBottom: 10,
	},
	button: {
		marginTop: 10,
	},
});

type SignUpFormData = {
	email: string;
	password: string;
	username: string;
};

export default function SignUpEmailScreen() {
	const {
		control,
		handleSubmit,
		setFocus,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>();
	// const { setUser } = useContext(AppwriteContext);

	const onSubmit = useCallback(async ({ email, password, username }: SignUpFormData) => {
		try {
			await appw.account.create(Crypto.randomUUID(), email, password, username);
			await appw.account.createEmailSession(email, password);
			// setUser(await appw.account.get());
		} catch (error: AppwriteException | any) {
			if (error instanceof AppwriteException) {
				return setError("root.serverError", {
					type: String(error.code),
					message: (() => {
						switch (error.code) {
							case 409:
								return "Email is already in use";
							default:
								console.error(error, error.code);
								return `An unexpected error occurred (${error.code})`;
						}
					})(),
				});
			}
			console.error(error);
		}
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Sign Up</Text>
				<View style={styles.form}>
					<Input
						control={control}
						name="email"
						placeholder="Email"
						rules={{
							required: {
								value: true,
								message: "Email is required",
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "invalid email address",
							},
						}}
						errors={errors}
						disabled={isSubmitting}
						returnKeyType="next"
						onSubmitEditing={() => setFocus("password")}
						containerStyle={styles.inputContainer}
					/>
					<Input
						control={control}
						name="password"
						placeholder="Password"
						rules={{
							required: { value: true, message: "Password is required" },
							minLength: { value: 6, message: "Password must be at least 6 characters" },
						}}
						errors={errors}
						disabled={isSubmitting}
						returnKeyType="next"
						onSubmitEditing={() => setFocus("username")}
						containerStyle={styles.inputContainer}
					/>
					<Input
						control={control}
						name="username"
						placeholder="Username"
						rules={{
							required: { value: true, message: "Username is required" },
							minLength: { value: 5, message: "Username must be at least 5 characters" },
						}}
						errors={errors}
						disabled={isSubmitting}
						onSubmitEditing={handleSubmit(onSubmit)}
						containerStyle={styles.inputContainer}
					/>
					<Button
						label="Sign up"
						disabled={isSubmitting}
						onPress={handleSubmit(onSubmit)}
						containerStyle={styles.button}
					/>
					<ErrorMessage message={errors?.root?.serverError?.message} />
				</View>
			</View>
		</View>
	);
}