import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

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
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3); // if android use elevation
`;
const BtnText = styled.Text`
	color: white;
`;

const Home = ({ navigation: { navigate } }) => (
	<View>
		<Title>My journal</Title>
		<Btn onPress={() => navigate("Write")}>
			<Ionicons name="add" color="white" size={40} />
		</Btn>
	</View>
);

export default Home;
