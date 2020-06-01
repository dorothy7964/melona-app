import 'react-native-gesture-handler';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthHome from "../screens/Auth/AuthHome";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";

const AuthNavigation = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <AuthNavigation.Navigator initialRouteName="AuthHome" headerMode="none">
                <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
                <AuthNavigation.Screen name="Signup" component={Signup} />
                <AuthNavigation.Screen name="Login" component={Login} />
                <AuthNavigation.Screen name="Confirm" component={Confirm} />
            </AuthNavigation.Navigator>
        </NavigationContainer>
    );
};