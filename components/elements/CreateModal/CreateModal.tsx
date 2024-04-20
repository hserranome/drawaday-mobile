import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Image } from "expo-image";

type CreateModalProps = {
	onClose?: () => void;
};

export const CreateModal = ({ onClose }: CreateModalProps) => {
	const [images, setImages] = useState<string[]>([]);
	const [type, setType] = useState<CameraType>(CameraType.front);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const cameraRef = useRef<Camera>(null);

	// if (!permission) ...

	// if (!permission.granted) ...

	const toggleCameraType = () =>
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));

	const takePicture = async () => {
		const photo = await cameraRef.current?.takePictureAsync();
		console.log(photo);
		setImages((current) => [...current, photo?.uri ?? ""]);
	};

	return (
		<Modal animationType="slide" transparent={true}>
			<View style={styles.container}>
				{/* @todo: use main button */}

				<View style={styles.form}>
					<View style={styles.cameraContainer}>
						{images.length === 0 ? (
							permission && permission.granted ? (
								<Camera ref={cameraRef} style={styles.camera} type={type}>
									<View style={styles.cameraBottom}>
										<Pressable onPress={toggleCameraType}>
											<FontAwesome name="refresh" style={styles.cameraIcon} />
										</Pressable>
										<Pressable onPress={takePicture}>
											<View style={styles.shutterButton}>
												<View style={styles.shutterButtonInner} />
											</View>
										</Pressable>
										<Pressable onPress={() => console.log("@todo: from gallery")}>
											<FontAwesome name="feed" style={styles.cameraIcon} />
										</Pressable>
									</View>
								</Camera>
							) : (
								<Text>Camera permission denied</Text>
							)
						) : (
							<View style={styles.camera}>
								{images.map((uri, index) => (
									<View key={index} style={styles.camera}>
										<Image source={uri} style={styles.camera} />
									</View>
								))}
							</View>
						)}
					</View>
				</View>
				<View style={styles.topHandle} />
				<Pressable onPress={onClose} style={styles.closeButton}>
					<FontAwesome name="close" style={styles.closeIcon} />
				</Pressable>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "100%",
		backgroundColor: Colors.background,
	},
	topHandle: {
		position: "absolute",
		width: "90%",
		height: 8,
		backgroundColor: "rgba(180,180,180,0.8)",
		borderRadius: 5,
		marginTop: 10,
		alignSelf: "center",
	},
	closeButton: {
		position: "absolute",
		top: 40,
		right: 20,
		padding: 10,
		height: 40,
		width: 40,
		borderRadius: 50,
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: "rgba(100,100,100,0.4)",
	},
	closeIcon: {
		alignSelf: "center",
		justifyContent: "center",
		height: 24,
		width: 24,
		textAlign: "center",
		fontSize: 24,
		color: "rgba(255,255,255,1)",
	},
	form: {
		// marginTop: 20,
		flex: 1,
	},
	cameraContainer: {
		alignSelf: "center",
		borderRadius: 10,
		overflow: "hidden",
		width: "95%",
		height: "70%",
		// backgroundColor: "red",
	},
	camera: {
		width: "100%",
		height: "100%",
	},
	cameraBottom: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		padding: 20,
	},
	cameraIcon: {
		fontSize: 24,
		color: "white",
	},
	shutterButton: {
		width: 60,
		height: 60,
		borderRadius: 50,
		borderWidth: 4,
		borderColor: "rgba(255,255,255,0.8)",
		justifyContent: "center",
		alignItems: "center",
	},
	shutterButtonInner: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "rgba(255,255,255,0.8)",
	},
});
