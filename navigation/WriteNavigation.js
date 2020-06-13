import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DaddyWrite from "../screens/Write/DaddyWrite";
import DaughterWrite from "../screens/Write/DaughterWrite";

const WriteNavigation = createStackNavigator();

export default ({ route: { params: { writeSelect } } }) => {
    return (
        <WriteNavigation.Navigator initialRouteName={writeSelect} headerMode="none">
            <WriteNavigation.Screen name="DaddyWrite" component={DaddyWrite} />
            <WriteNavigation.Screen name="DaughterWrite" component={DaughterWrite} />
        </WriteNavigation.Navigator>
    );
};