import { StyleSheet, StyleProp, TextInput, ViewStyle } from "react-native";
import { View } from "@/components/elements/Themed";
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
