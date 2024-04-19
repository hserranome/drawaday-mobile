import { Account, Client } from "react-native-appwrite/src";

const client = new Client();
client
	.setEndpoint(String(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT))
	.setProject(String(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID))
	.setPlatform("com.drawaday.app");

const account = new Account(client);

export const appw = {
	account,
};
