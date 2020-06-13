import 'react-native-gesture-handler';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import ConfirmNavigation from "./ConfirmNavigation";
import WriteNavigation from "./WriteNavigation";
import SearchNavigation from "./SearchNavigation";

const MainNavigation = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <MainNavigation.Navigator 
                initialRouteName="TabNavigation"
                headerMode="none"
            >
                <MainNavigation.Screen 
                    name="TabNavigation" 
                    component={TabNavigation} 
                />
                <MainNavigation.Screen 
                    name="ConfirmNavigation" 
                    component={ConfirmNavigation} 
                />
                <MainNavigation.Screen 
                    name="SearchNavigation" 
                    component={SearchNavigation} 
                />
                <MainNavigation.Screen 
                    name="WriteNavigation" 
                    component={WriteNavigation} 
                />
            </MainNavigation.Navigator>
        </NavigationContainer>
    );
};