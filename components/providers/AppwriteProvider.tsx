import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import * as Crypto from "expo-crypto";
import { appw } from "@/api/appwrite";
import { AppwriteException, ID, Models } from "react-native-appwrite/src";

export type SignUpFormData = {
	email: string;
	password: string;
	username: string;
};

export type SignInFormData = {
	email: string;
	password: string;
};

type AppwriteContextType = {
	initialized: boolean;
	user: Models.User<Models.Preferences> | null;
	signIn: ({ email, password }: SignInFormData) => Promise<void>;
	signUp: ({ email, password, username }: SignUpFormData) => Promise<void>;
	logOut: () => Promise<void>;
};

export const AppwriteContext = createContext<AppwriteContextType>({} as AppwriteContextType);

const genericErrorMessages: Record<string, string> = {
	429: "Too many requests. Try again later.",
};

const getAppwriteExceptionErrorMessage = (error: AppwriteException, customErrors?: Record<string, string>) => {
	if (customErrors && error.code in customErrors) return customErrors[error.code];

	if (error.code in genericErrorMessages) return genericErrorMessages[error.code];

	console.error(error, error.code);
	return `An unexpected error occurred (${error.code})`;
};

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

	const signIn = async ({ email, password }: SignInFormData) => {
		try {
			await appw.account.createEmailSession(email, password);
			setUser(await appw.account.get());
		} catch (error) {
			if (!AppwriteException) {
				console.error(error);
				throw "An unexpected error occurred (000)";
			}
			if (error instanceof AppwriteException) {
				throw getAppwriteExceptionErrorMessage(error, {
					400: "Invalid email or password",
					401: "Invalid email or password",
				});
			}
		}
	};

	const signUp = async ({ email, password, username }: SignUpFormData) => {
		try {
			await appw.account.create(ID.unique(), email, password);
			await appw.account.createEmailSession(email, password);
			setUser(await appw.account.get());
		} catch (error: AppwriteException | any) {
			throw getAppwriteExceptionErrorMessage(error, {
				409: "Email is already in use",
			});
		}
	};

	const logOut = async () => {
		try {
			await appw.account.deleteSession("current");
			setUser(null);
			router.replace("/auth/");
		} catch (error) {
			console.error(JSON.stringify(error));
		}
	};

	useEffect(() => {
		if (user) router.replace("/app/");
		if (!user) router.replace("/auth/");
	}, [user]);

	return (
		<AppwriteContext.Provider value={{ initialized, user, signIn, signUp, logOut }}>
			{children}
		</AppwriteContext.Provider>
	);
}
