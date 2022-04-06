import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import { FlatList } from "react-native";

const View = styled.View`
	flex: 1;
	padding: 0 30px;
	padding-top: 100px;
	background-color: ${colors.bgColor};
`;
const Title = styled.Text`
	color: ${colors.textColor};
	font-size: 38px;
	margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
	position: absolute;
	bottom: 50px;
	right: 50px;
	height: 80px;
	width: 80px;
	border-radius: 40px;
	justify-content: center;
	align-items: center;
	background-color: ${colors.btnColor};
	elevation: 5;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
// if android make shadow with elevation

const BtnText = styled.Text`
	color: white;
`;

const Record = styled.View`
	background-color: ${colors.cardColor};
	flex-direction: row;
	padding: 10px 20px;
	border-radius: 10px;
	align-items: center;
`;
const Emotion = styled.Text`
	font-size: 24px;
	margin-right: 10px;
`;
const Message = styled.Text`
	font-size: 18px;
`;
const Separator = styled.View`
	height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
	const realm = useDB();
	const [feelings, setFeelings] = useState([]);
	useEffect(() => {
		const feelings = realm.objects("Feeling");
		setFeelings(feelings);
		feelings.addListener(() => {
			const feelings = realm.objects("Feeling");
			setFeelings(feelings);
		});
		return () => feelings.removeAllListeners();
	}, []);
	console.log(feelings);
	return (
		<View>
			<Title>My journal</Title>
			<FlatList
				data={feelings}
				contentContainerStyle={{ paddingVertical: 10 }}
				ItemSeparatorComponent={Separator}
				keyExtractor={(feeling) => feeling._id}
				renderItem={({ item }) => (
					<Record>
						<Emotion>{item.emotion}</Emotion>
						<Message>{item.message}</Message>
					</Record>
				)}
			/>
			<Btn onPress={() => navigate("Write")}>
				<Ionicons name="add" color="white" size={40} />
			</Btn>
		</View>
	);
};

export default Home;
