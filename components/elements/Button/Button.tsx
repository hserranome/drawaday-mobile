import Colors from "@/constants/Colors";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 1000,
		overflow: "hidden",
		backgroundColor: Colors.text,
	},
	pressable: {},
	text: {
		width: "100%",
		textAlign: "center",
		color: Colors.background,
		fontSize: 20,
		fontWeight: "600",
	},
});

import { PropsWithChildren, useCallback } from "react";
import { Link } from "expo-router";

export type ButtonProps = PropsWithChildren<{
	label?: string;
	onPress?: () => void;
	disabled?: boolean;
	href?: any;
	containerStyle?: StyleProp<ViewStyle>;
	pressableStyles?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}>;

export const Button = ({
	label,
	onPress,
	disabled,
	href,
	containerStyle,
	pressableStyles,
	textStyle,
	children,
}: ButtonProps) => {
	const Wrapper = useCallback(
		(props: any) =>
			href ? (
				<View {...props}>
					<Link asChild href={href} children={props.children} />
				</View>
			) : (
				<View {...props} />
			),
		[href]
	);
	return (
		<Wrapper style={[styles.container, containerStyle]}>
			<Pressable
				style={[styles.pressable, pressableStyles]}
				onPress={!href ? onPress : null}
				disabled={disabled}
				android_ripple={{ color: "#f0f", borderless: true, radius: 250 }}
			>
				<Text style={[styles.text, textStyle]}>{label}</Text>
				{children}
			</Pressable>
		</Wrapper>
	);
};
