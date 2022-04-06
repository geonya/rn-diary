import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import { useDB } from "../context";

const View = styled.View`
	flex: 1;
	background-color: ${colors.bgColor};
	padding: 0px 30px;
`;
const Title = styled.Text`
	color: ${colors.textColor};
	margin: 50px 0;
	text-align: center;
	font-size: 28px;
	font-weight: 600;
`;

const TextInput = styled.TextInput`
	background-color: white;
	border-radius: 20px;
	padding: 10px 20px;
	font-size: 18px;
`;

const Btn = styled.TouchableOpacity`
	width: 100%;
	padding: 10px 20px;
	margin-top: 30px;
	border-radius: 20px;
	align-items: center;
	background-color: ${colors.btnColor};
`;
const BtnText = styled.Text`
	font-size: 18px;
	color: white;
	font-weight: 500;
`;

const Emotions = styled.View`
	flex-direction: row;
	margin-bottom: 20px;
	justify-content: space-between;
`;
const Emotion = styled.TouchableOpacity`
	background-color: white;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
	padding: 10px;
	border-radius: 10px;
	border: ${(props) => (props.selected ? "2px" : "0px")};
	border-color: rgba(0, 0, 0, 0.5);
`;
const EmotionText = styled.Text`
	font-size: 15px;
`;

const emotions = ["😎", "😭", "😳", "🤣", "🥰", "🥶", "🤨"];

const Write = ({ navigation: { goBack } }) => {
	const realm = useDB();
	useEffect(() => {
		console.log(realm);
	}, []);
	const [selectedEmotion, setEmotion] = useState(null);
	const [feelings, setFeelings] = useState("");
	const onChangeText = (text) => setFeelings(text);
	const onEmotionPress = (face) => setEmotion(face);
	const onSubmit = () => {
		if (feelings === "" || selectedEmotion === null) {
			return Alert.alert("Please complete form !");
		}
		realm.write(() => {
			const feeling = realm.create("Feeling", {
				_id: Date.now(),
				emotion: selectedEmotion,
				message: feelings,
			});
		});
		goBack();
	};
	return (
		<View>
			<Title>How do you feel today?</Title>
			<Emotions>
				{emotions.map((emotion, i) => (
					<Emotion
						selected={emotion === selectedEmotion}
						onPress={() => onEmotionPress(emotion)}
						key={i}
					>
						<EmotionText>{emotion}</EmotionText>
					</Emotion>
				))}
			</Emotions>
			<TextInput
				returnKeyType="done"
				onSubmitEditing={onSubmit}
				onChangeText={onChangeText}
				value={feelings}
				placeholder="Write your feelings..."
			/>
			<Btn>
				<BtnText onPress={onSubmit}>Save</BtnText>
			</Btn>
		</View>
	);
};

export default Write;
