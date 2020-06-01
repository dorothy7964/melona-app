import 'react-native-gesture-handler';
import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import Confirm from "../screens/Tabs/Confirm";
import Search from "../screens/Tabs/Search";
import Profile from "../screens/Tabs/Profile";

const TabNavigation = createBottomTabNavigator();

export default () => {
    return (
        <NavigationContainer>
            <TabNavigation.Navigator>
                <TabNavigation.Screen name="Home" component={Home} />
                <TabNavigation.Screen name="Confirm" component={Confirm} />
                <TabNavigation.Screen name="Add" component={View} listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        console.log("add");
                    }
                }} />
                <TabNavigation.Screen name="Search" component={Search} />
                <TabNavigation.Screen name="Profile" component={Profile} />
            </TabNavigation.Navigator>
        </NavigationContainer>
    );
};