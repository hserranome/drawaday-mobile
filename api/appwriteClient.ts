import { Client, Account, ID } from "react-native-appwrite/src";

export const initAppwriteClient = () => {
	const client = new Client();
	client
		.setEndpoint("http://appwrite-nccw80c.51.178.84.122.sslip.io/v1")
		.setProject("drawaday")
		.setPlatform("com.drawaday.app");
	return client;
};
