import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Navigator from "./navigator";
import Realm from "realm";
import AppLoading from "expo-app-loading";
import { DBContext } from "./context";

const FeelingSchema = {
	name: "Feeling",
	properties: {
		_id: "int",
		emotion: "string",
		message: "string",
	},
	primaryKey: "_id",
};

export default function App() {
	const [ready, setReady] = useState(false);
	const [realm, setRealm] = useState(null);
	const startLoading = async () => {
		const connection = await Realm.open({
			path: "rnDiaryDB",
			schema: [FeelingSchema],
		});
		setRealm(connection);
	};

	const onFinsh = () => setReady(true);
	if (!ready) {
		return (
			<AppLoading
				startAsync={startLoading}
				onFinish={onFinsh}
				onError={console.error}
			/>
		);
	}
	// context 박스로 감싸면 value 를 해당 컴포넌트들에서 이용 가능하다
	return (
		<DBContext.Provider value={realm}>
			<NavigationContainer>
				<Navigator />
			</NavigationContainer>
		</DBContext.Provider>
	);
}
