import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DaddyWrite from "../screens/Write/DaddyWrite";
import DaughterWrite from "../screens/Write/DaughterWrite";

const WriteNavigation = createStackNavigator();

export default () => {
    return (
        <WriteNavigation.Navigator initialRouteName="DaddyWrite" headerMode="none">
            <WriteNavigation.Screen name="DaddyWrite" component={DaddyWrite} />
            <WriteNavigation.Screen name="DaughterWrite" component={DaughterWrite} />
        </WriteNavigation.Navigator>
    );
};