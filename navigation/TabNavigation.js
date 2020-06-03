import 'react-native-gesture-handler';
import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import Confirm from "../screens/Tabs/Confirm";
import Search from "../screens/Tabs/Search";
import Profile from "../screens/Tabs/Profile";
import StackFactory from "./StackFactory";
import { NavigationContainer } from '@react-navigation/native';

const TabNavigation = createBottomTabNavigator();

export default () => {
    return (
        <TabNavigation.Navigator>
            <TabNavigation.Screen 
                name="Home" 
                component={StackFactory} 
                initialParams={{
                    initialRoute: Home,
                    customConfig: {
                        title: "Home",
                        headerTitleStyle: {
                            alignSelf: "center"
                        }
                    }
                }}
            />
            <TabNavigation.Screen
                name="Confirm" 
                component={StackFactory} 
                initialParams={{
                    initialRoute: Confirm,
                    customConfig: {
                        title: "Confirm",
                        headerTitleStyle: {
                            alignSelf: "center"
                        }
                    }
                }}
            />
            <TabNavigation.Screen
                name="Add" 
                component={View} 
                listeners={({ navigation }) => ({
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate("PhotoNavigation")
                    }
                })} 
            />
            <TabNavigation.Screen
                name="Search" 
                component={StackFactory} 
                initialParams={{
                    initialRoute: Search,
                    customConfig: {
                        title: "Search",
                        headerTitleStyle: {
                            alignSelf: "center"
                        }
                    }
                }}
            />
            <TabNavigation.Screen
                name="Profile" 
                component={StackFactory} 
                initialParams={{
                    initialRoute: Profile,
                    customConfig: {
                        title: "Profile",
                        headerTitleStyle: {
                            alignSelf: "center"
                        }
                    }
                }}
            />
        </TabNavigation.Navigator>
    );
};