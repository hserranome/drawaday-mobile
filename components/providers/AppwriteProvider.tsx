import { appw } from "@/api/appwrite";
import { SplashScreen, useRouter } from "expo-router";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite/src";

type AppwriteContextType = {
	initializing: boolean;
	user: Models.User<Models.Preferences> | null;
	setUser: (user: Models.User<Models.Preferences> | null) => void;
};

export const AppwriteContext = createContext<AppwriteContextType>({} as AppwriteContextType);

export function AppwriteProvider({ children }: PropsWithChildren) {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const loggedUser = await appw.account.get();
			console.log("loggedUser", loggedUser);
			SplashScreen.hideAsync();
			if (!loggedUser) {
				router.replace("/");
				return;
			}
			setUser(loggedUser);
			setInitializing(false);
		})();
	}, []);

	return (
		<AppwriteContext.Provider
			value={{
				initializing,
				user,
				setUser,
			}}
		>
			{children}
		</AppwriteContext.Provider>
	);
}
