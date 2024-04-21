import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},

	image: {
		width: "100%",
		height: "100%",
	},
	gradient: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
});

type GradientOverlayImageProps = {
	source: any;
	containerStyle?: StyleProp<ViewStyle>;
	imageStyle?: StyleProp<ImageStyle>;
};

export const GradientOverlayImage = ({ source, containerStyle, imageStyle }: GradientOverlayImageProps) => (
	<View style={[styles.container, containerStyle]}>
		<Image source={source} style={[styles.image, imageStyle]} />
		<LinearGradient
			colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
			style={styles.gradient}
		/>
	</View>
);
