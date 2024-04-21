import { StyleSheet, StyleProp, TextInput, ViewStyle, View } from "react-native";
import { Control, Controller, UseControllerProps } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
	input: {
		color: Colors.inputText,

		backgroundColor: Colors.inputBackground,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
		fontSize: 14,
	},
	errorMessage: {
		fontSize: 12,
		color: "red",
	},
});

export type InputProps = {
	control?: Control<any>;
	name: string;
	placeholder?: string;
	rules?: UseControllerProps<any>["rules"];
	errors?: any;
	disabled?: boolean;
	value?: string;
	onChangeText?: (text: string) => void;
	containerStyle?: StyleProp<ViewStyle>;
	secureTextEntry?: TextInput["props"]["secureTextEntry"];
	autoCapitalize?: TextInput["props"]["autoCapitalize"];
	autoComplete?: TextInput["props"]["autoComplete"];
	keyboardType?: TextInput["props"]["keyboardType"];
	returnKeyType?: TextInput["props"]["returnKeyType"];
	onSubmitEditing?: TextInput["props"]["onSubmitEditing"];
};

export const Input = ({
	control,
	name,
	placeholder,
	rules,
	errors,
	returnKeyType,
	disabled,
	value,
	onSubmitEditing,
	keyboardType,
	autoCapitalize,
	autoComplete,
	secureTextEntry,
	containerStyle,
	onChangeText,
}: InputProps) => (
	<View style={containerStyle}>
		{control && (
			<Controller
				control={control}
				rules={rules}
				name={name}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<TextInput
						ref={ref}
						placeholder={placeholder}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						editable={!disabled}
						style={styles.input}
						returnKeyType={returnKeyType}
						placeholderTextColor={Colors.inputPlaceholder}
						secureTextEntry={secureTextEntry}
						onSubmitEditing={onSubmitEditing}
						keyboardType={keyboardType}
						autoCapitalize={autoCapitalize}
						autoComplete={autoComplete}
					/>
				)}
			/>
		)}
		{!control && <TextInput style={styles.input} onChangeText={onChangeText} value={value} placeholder={placeholder} />}
		<ErrorMessage message={errors?.[name]?.message} />
	</View>
);
