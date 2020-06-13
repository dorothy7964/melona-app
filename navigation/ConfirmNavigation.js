import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Buy from "../screens/Confirm/Buy";
import Apply from "../screens/Confirm/Apply";

const ConfirmNavigation = createStackNavigator();

export default ({ route: { params: { select } } }) => {
    return (
        <ConfirmNavigation.Navigator initialRouteName={select} headerMode="none">
            <ConfirmNavigation.Screen name="Buy" component={Buy} />
            <ConfirmNavigation.Screen name="Apply" component={Apply} />
        </ConfirmNavigation.Navigator>
    );
};