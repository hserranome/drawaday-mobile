import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { Image } from "expo-image";
import { Input } from "../Input";
import { Button } from "../Button";
import { appw } from "@/api/appwrite";
import { ID } from "react-native-appwrite/src";

type CreateModalProps = {
	onClose?: () => void;
};

type ImageItem = {
	uri: string;
	status?: "loading" | "done" | "error";
};

export const CreateModal = ({ onClose }: CreateModalProps) => {
	const [description, setDescription] = useState("");
	const [images, setImages] = useState<ImageItem[]>([]);
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [type, setType] = useState<CameraType>(CameraType.back);
	const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const cameraRef = useRef<Camera>(null);
	const imageScrollViewRef = useRef<ScrollView>(null);

	const toggleCameraType = useCallback(
		() => setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back)),
		[]
	);

	const onFlashTypeSwitch = useCallback(() => {
		setFlashMode((current) => {
			switch (current) {
				case FlashMode.off:
					return FlashMode.on;
				case FlashMode.on:
					return FlashMode.auto;
				case FlashMode.auto:
				case FlashMode.torch:
					return FlashMode.off;
			}
		});
	}, []);

	const takePicture = useCallback(async () => {
		var startTime = performance.now();

		const photo = await cameraRef.current?.takePictureAsync({
			quality: 0,

			skipProcessing: true,
			base64: false,
		});

		var endTime = performance.now();

		console.log(`Call to doSomething took ${endTime - startTime} milliseconds.`);

		if (!photo?.uri) return;

		setImages((current) => [...current, { uri: photo.uri, description: "" }]);
		setSelectedImage(images.length);
		imageScrollViewRef.current?.scrollToEnd({ animated: true });
	}, [images]);

	const pickImages = useCallback(async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsMultipleSelection: true,
			quality: 1,
			base64: false,
		});
		if (result.canceled) return;

		const { assets } = result;
		setImages((current) => [...current, ...assets.map(({ uri }) => ({ uri, description: "" }))]);
		setSelectedImage(images.length);
		imageScrollViewRef.current?.scrollToEnd({ animated: true });
	}, [images]);

	const onImageSelect = useCallback((index: number) => setSelectedImage(index), []);
	const onRemoveImage = useCallback((index: number) => {
		setImages((current) => current.filter((_, i) => i !== index));
		setSelectedImage((current) => (current ? Math.min(0, current - 1) : null));
	}, []);

	const onSubmit = useCallback(async () => {
		try {
			if (images.length === 0) return;
			const files = await Promise.all(
				images.map(async ({ uri }, index) => {
					setImages((current) => current.map((item, i) => (i === index ? { ...item, status: "loading" } : item)));
					const file = new File([uri], uri);
					return appw.storage.createFile("post-files", ID.unique(), {
						name: file.name,
						type: "image/jpg",
						size: file.size,
						uri,
					});
				})
			);

			const post = await appw.databases.createDocument("posts", "posts", ID.unique(), {
				description,
				files: files.map(({ $id }) => $id),
			});
			console.log("onSubmit", { post, files });
		} catch (error) {
			console.error("onSubmit", error);
		}
	}, [images, description]);

	const renderImageStatusIcon = useCallback((status: ImageItem["status"]) => {
		switch (status) {
			case "loading":
				return <FontAwesome6 name="spinner" style={styles.imageBottomIcon} />;
			case "done":
				return <FontAwesome name="check" style={styles.imageBottomIcon} />;
			case "error":
				return <FontAwesome name="times" style={styles.imageBottomIcon} />;
			default:
				return null;
		}
	}, []);

	const renderImages = useCallback(
		() =>
			images.length > 0 && (
				<ScrollView
					ref={imageScrollViewRef}
					horizontal
					style={styles.imagesScrollView}
					contentContainerStyle={styles.imagesContentContainer}
				>
					{images.map(({ uri, status }, index) => (
						<Pressable
							key={`image-${index}`}
							style={[styles.imageContainer, index === selectedImage && styles.imageContainerSelected]}
							onPress={() => onImageSelect(index)}
						>
							<Image source={{ uri }} style={{ width: "100%", height: "100%" }} />
							{status && <View style={styles.imageStatusContainer}>{renderImageStatusIcon(status)}</View>}
						</Pressable>
					))}
				</ScrollView>
			),
		[images, selectedImage]
	);

	const hasCameraAccess = useMemo(() => !!permission && permission.granted, [permission]);

	return (
		<Modal animationType="slide" transparent={true}>
			<View style={styles.container}>
				<View style={styles.mainImageContainer}>
					{selectedImage === null && (
						<>
							{hasCameraAccess ? (
								<Camera ref={cameraRef} style={styles.camera} type={type} flashMode={flashMode} />
							) : (
								<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
									<Text style={{ color: "white", fontSize: 18, marginBottom: 20 }}>Camera permission denied</Text>
									<Button label="Allow camera" onPress={requestPermission} />
								</View>
							)}
							<View style={styles.mainImageBottom}>
								{renderImages()}
								<View style={styles.imageBottomButtons}>
									{hasCameraAccess ? (
										<>
											<Pressable onPress={toggleCameraType}>
												<FontAwesome name="refresh" style={styles.imageBottomIcon} />
											</Pressable>
											<Pressable onPress={takePicture}>
												<View style={styles.shutterButton}>
													<View style={styles.shutterButtonInner} />
												</View>
											</Pressable>
										</>
									) : (
										<>
											<View />
											<View />
										</>
									)}
									<Pressable onPress={pickImages}>
										<FontAwesome name="image" style={styles.imageBottomIcon} />
									</Pressable>
								</View>
							</View>
						</>
					)}
					{selectedImage !== null && (
						<View style={{ width: "100%", height: "100%" }}>
							<Image source={{ uri: images?.[selectedImage].uri }} style={{ width: "100%", height: "100%" }} />
							<View style={styles.mainImageBottom}>
								{renderImages()}
								<View style={styles.imageBottomButtons}>
									<Pressable onPress={() => onRemoveImage(selectedImage)}>
										<FontAwesome name="trash" style={styles.imageBottomIcon} />
									</Pressable>
									<Pressable onPress={() => setSelectedImage(null)}>
										<FontAwesome name="plus" style={styles.imageBottomIcon} />
									</Pressable>
								</View>
							</View>
						</View>
					)}
				</View>
				<View style={styles.form}>
					<Input name="description" placeholder="Title" value={description} onChangeText={setDescription} />
					<Button label="Create" onPress={onSubmit} containerStyle={styles.button} />
				</View>
				<View style={styles.containerTop}>
					<Pressable onPress={onClose} style={styles.closeButton}>
						<FontAwesome name="close" style={styles.topIcon} />
					</Pressable>
				</View>
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
	containerTopBackground: {
		position: "absolute",
		width: 120,
		height: 60,
	},
	containerTop: {
		position: "absolute",
		top: 0,
		width: "100%",
		flexDirection: "row",
		paddingTop: 10,
		paddingHorizontal: 20,
		justifyContent: "space-between",
	},
	closeButton: {
		height: 40,
		width: 40,
		borderRadius: 50,
		alignContent: "center",
		justifyContent: "center",
	},
	topIcon: {
		alignSelf: "center",
		justifyContent: "center",
		height: 24,
		width: 24,
		textAlign: "center",
		fontSize: 24,
		color: "rgba(255,255,255,1)",
	},
	imagesScrollView: {
		maxHeight: 48,
		width: "95%",
		alignSelf: "center",
		marginTop: 10,
		overflow: "visible",
	},
	imagesContentContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	imageContainer: {
		height: 48,
		width: 48,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.6)",
		borderRadius: 5,
		overflow: "hidden",
		marginRight: 5,
	},
	imageContainerSelected: {
		borderWidth: 2,
		borderColor: "#f0f",
	},
	imageStatusContainer: {
		position: "absolute",
		top: 0,
		right: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	form: {
		marginTop: 10,
		marginBottom: 10,
		width: "95%",
		alignSelf: "center",
	},
	button: {
		marginTop: 20,
		width: 120,
		alignSelf: "flex-end",
	},
	mainImageContainer: {
		alignSelf: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.text,
		overflow: "hidden",
		width: "95%",
		flex: 1,
	},
	camera: {
		width: "100%",
		height: "100%",
	},
	mainImageBottom: {
		position: "absolute",
		bottom: 0,
		width: "100%",
	},
	imageBottomButtons: {
		height: 60,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		margin: 20,
	},
	imageBottomIcon: {
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
