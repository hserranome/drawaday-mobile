import { appw } from "@/api/appwrite";
import { SplashScreen, useRouter } from "expo-router";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Account, Client, Models } from "react-native-appwrite/src";

type AppwriteContextType = {
	initialized: boolean;
	user: Models.User<Models.Preferences> | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

export const AppwriteContext = createContext<AppwriteContextType>({} as AppwriteContextType);

export function AppwriteProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

	const router = useRouter();

	async function init() {
		try {
			const loggedIn = await appw.account.get();
			setUser(loggedIn);
		} catch (err) {
			setUser(null);
		}
		setInitialized(true);
	}

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		if (initialized) {
			if (!user) router.replace("/auth/");
			SplashScreen.hideAsync();
		}
	}, [initialized]);

	const login = async (email: string, password: string) => {
		try {
			await appw.account.createEmailSession(email, password);
			setUser(await appw.account.get());
			router.replace("/(app)/");
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async () => {
		try {
			await appw.account.deleteSession("current");
			setUser(null);
			router.replace("/auth/");
		} catch (error) {
			console.error(JSON.stringify(error));
		}
	};

	useEffect(() => {}, [user]);

	return <AppwriteContext.Provider value={{ initialized, user, login, logout }}>{children}</AppwriteContext.Provider>;
}
