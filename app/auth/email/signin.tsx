import { StyleSheet, Text, View } from "react-native";

import { useCallback, useContext } from "react";

import { useForm } from "react-hook-form";
import { AppwriteException } from "react-native-appwrite/src";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { ErrorMessage } from "@/components/elements/ErrorMessage";
import { AppwriteContext } from "@/components/providers";
import { GradientOverlayImage } from "@/components/elements/GradientOverlayImage";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
	title: {
		color: Colors.text,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	form: {
		width: "90%",
	},
	inputContainer: {
		marginBottom: 10,
	},
	button: {
		marginTop: 10,
	},
});

type SignInFormData = {
	email: string;
	password: string;
};

export default function SignInEmailScreen() {
	const {
		control,
		handleSubmit,
		setFocus,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>();
	const { login } = useContext(AppwriteContext);

	const onSubmit = async ({ email, password }: SignInFormData) => {
		console.log("onSubmit");
		login(email, password).catch((error) => {
			console.error(error);
		});
	};

	return (
		<>
			<GradientOverlayImage
				source={require("../../../assets/images/auth/signin-bg.png")}
				containerStyle={{ height: "85%", bottom: 0 }}
				imageStyle={{ resizeMode: "contain", bottom: 95 }}
			/>
			<Text style={styles.title}>Sign in with email</Text>
			<View style={styles.form}>
				<Input
					control={control}
					name="email"
					placeholder="Email"
					keyboardType="email-address"
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
					secureTextEntry={true}
					rules={{
						required: { value: true, message: "Password is required" },
					}}
					errors={errors}
					disabled={isSubmitting}
					onSubmitEditing={handleSubmit(onSubmit)}
					containerStyle={styles.inputContainer}
				/>
				<Button
					label="Sign in"
					disabled={isSubmitting}
					onPress={handleSubmit(onSubmit)}
					containerStyle={styles.button}
				/>
				<ErrorMessage message={errors?.root?.serverError?.message} />
			</View>
		</>
	);
}
