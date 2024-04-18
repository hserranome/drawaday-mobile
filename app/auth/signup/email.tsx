import { StyleSheet } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { CTALinkButton } from "@/components/elements/CTALinkButton";
import { useCallback } from "react";
import { appw } from "@/api/appwrite";
import { useForm } from "react-hook-form";
import { AppwriteException } from "react-native-appwrite/src";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { ErrorMessage } from "@/components/elements/ErrorMessage";

const login = async (email: string, password: string) => {
	await appw.account.createEmailSession(email, password);
	const loggedInUser = await appw.account.get();
	console.log(loggedInUser);
};

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

	const onSubmit = useCallback(async ({ email, password, username }: SignUpFormData) => {
		try {
			await appw.account.create("blabla", email, password, username);
			await login(email, password);
		} catch (error: AppwriteException | any) {
			if (error instanceof AppwriteException) {
				return setError("root.serverError", {
					type: String(error.code),
					message: (() => {
						switch (error.code) {
							case 409:
								return "Email is already in use";
							case 429:
								return "Too many requests, please try again later";
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

	console.log(errors);
	return (
		<View style={styles.container}>
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
				<Button disabled={isSubmitting} onPress={handleSubmit(onSubmit)} />
				<ErrorMessage message={errors?.root?.serverError?.message} />
			</View>
			<CTALinkButton href="../auth/signup/email" label="Sign up with email" />
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
	form: {
		width: "80%",
	},
	inputContainer: {
		marginBottom: 10,
	},
});
