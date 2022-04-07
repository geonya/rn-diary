import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import { FlatList, LayoutAnimation } from "react-native";
import { TouchableOpacity } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const View = styled.View`
	flex: 1;

	align-items: center;
	padding: 0 30px;
	padding-top: 100px;
	background-color: ${colors.bgColor};
`;
const Title = styled.Text`
	color: ${colors.textColor};
	font-size: 38px;
	width: 100%;
	margin-bottom: 50px;
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
		feelings.addListener((feelings) => {
			// feelings 에 변화를 감지하여 작동함
			LayoutAnimation.spring(); // state에 어떤 변화가 생기든 animate 해라 -> animation 을 굉장히 쉽게 만들어줌
			//https://reactnative.dev/docs/layoutanimation
			// android 의 경우 animation 을 위해 따로 UIManager 코드를 실행 시켜야함
			// if (Platform.OS === 'android') {
			// 	if (UIManager.setLayoutAnimationEnabledExperimental) {
			// 		UIManager.setLayoutAnimationEnabledExperimental(true);
			// 	}
			// }
			setFeelings(feelings.sorted("_id", true)); // true/false 정렬 방법
		});
		// component가 모두 mount 되면 lisnter를 제거 한다.
		return () => feelings.removeAllListeners();
	}, []);
	const handleDelete = (id) => {
		realm.write(() => {
			//realm 에서는 항상 write 안에서 add / delete / edit 을 한다
			// id 를 이용해서 찾고 지운다.
			const feeling = realm.objectForPrimaryKey("Feeling", id); // get Feeling
			//https://www.mongodb.com/docs/realm/sdk/node/examples/read-and-write-data/
			realm.delete(feeling);
		});
	};
	return (
		<View>
			<Title>My journal</Title>
			<AdMobBanner
				style={{ backgroundColor: colors.bgColor }}
				bannerSize="fullBanner"
				adUnitID="ca-app-pub-3940256099942544/2934735716"
			/>
			<FlatList
				style={{ marginVertical: 50, width: "100%" }}
				data={feelings}
				contentContainerStyle={{ paddingVertical: 10 }}
				ItemSeparatorComponent={Separator}
				keyExtractor={(feeling) => feeling._id}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handleDelete(item._id)}>
						<Record>
							<Emotion>{item.emotion}</Emotion>
							<Message>{item.message}</Message>
						</Record>
					</TouchableOpacity>
				)}
			/>
			<Btn onPress={() => navigate("Write")}>
				<Ionicons name="add" color="white" size={40} />
			</Btn>
		</View>
	);
};

export default Home;
