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
		emotion: "string", // string? => not required
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
	return (
		<DBContext.Provider value={realm}>
			<NavigationContainer>
				<Navigator />
			</NavigationContainer>
		</DBContext.Provider>
	);
}
