import { StatusBar } from "expo-status-bar";
import { Button, Platform, Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/elements/Themed";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { appw } from "@/api/appwrite";
import { Models } from "react-native-appwrite/src";
import { CTALinkButton } from "@/components/elements/CTALinkButton";

const styles = StyleSheet.create({
	root: {
		marginTop: 40,
		marginBottom: 40,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
	button: {
		backgroundColor: "gray",
		padding: 10,
		marginBottom: 10,
		alignItems: "center",
	},
});

export default function SignInScreen() {
	const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	async function login(email: string, password: string) {
		await appw.account.createEmailSession(email, password);
		setLoggedInUser(await appw.account.get());
	}

	return (
		<View style={styles.root}>
			<Text>{loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}</Text>
			<View>
				<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
				<TextInput
					style={styles.input}
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
				<TextInput style={styles.input} placeholder="Name" value={name} onChangeText={(text) => setName(text)} />

				<Pressable style={styles.button} onPress={() => login(email, password)}>
					<Text>Login</Text>
				</Pressable>

				<Pressable
					style={styles.button}
					onPress={async () => {
						await appw.account.deleteSession("current");
						setLoggedInUser(null);
					}}
				>
					<Text>Logout</Text>
				</Pressable>
			</View>
			<CTALinkButton href="/auth/signup/" label="No account? Sign up instead." />
		</View>
	);
}
