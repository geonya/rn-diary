import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Navigator from "./navigator";
import Realm from "realm";
import AppLoading from "expo-app-loading";

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
	const startLoading = async () => {
		const realm = await Realm.open({
			path: "rnDiaryDB",
			schema: [FeelingSchema],
		});
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
	return (
		<NavigationContainer>
			<Navigator />
		</NavigationContainer>
	);
}
