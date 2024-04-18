import { Account, Client } from "react-native-appwrite/src";

const client = new Client();
client
	.setEndpoint("http://appwrite-nccw80c.51.178.84.122.sslip.io/v1")
	.setProject("drawaday")
	.setPlatform("com.drawaday.app");

const account = new Account(client);

export const appw = {
	client,
	account,
};
