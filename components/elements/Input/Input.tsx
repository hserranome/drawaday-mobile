import { StyleSheet, StyleProp, TextInput, ViewStyle } from "react-native";
import { View } from "@/components/elements/Themed";
import { Control, Controller, UseControllerProps } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";

const styles = StyleSheet.create({
	input: {
		color: "black",
		backgroundColor: "white",
		height: 40,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderColor: "gray",
		borderWidth: 1,
	},
	errorMessage: {
		fontSize: 12,
		color: "red",
	},
});

export type InputProps = {
	control: Control<any>;
	name: string;
	placeholder: string;
	rules: UseControllerProps<any>["rules"];
	errors: any;
	disabled?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
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
	onSubmitEditing,
	containerStyle,
}: InputProps) => (
	<View style={containerStyle}>
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
					onSubmitEditing={onSubmitEditing}
				/>
			)}
		/>
		<ErrorMessage message={errors[name]?.message} />
	</View>
);
