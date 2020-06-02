import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const StackFactory = createStackNavigator();

export default ({ route }) => {
    const { initialRoute, customConfig } = route.params;

    return (
        <StackFactory.Navigator initialRouteName="Home">
            <StackFactory.Screen 
                name={route.name} 
                component={initialRoute} 
                options={customConfig} 
            />
        </StackFactory.Navigator>
    );
};