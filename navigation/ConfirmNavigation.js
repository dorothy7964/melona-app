import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import Buy from "../screens/Confirm/Buy";
import Apply from "../screens/Confirm/Apply";

const ConfirmNavigation = createStackNavigator();

export default ({ route: { params: { select } } }) => {
    const navigation = useNavigation();  

    return (
        <ConfirmNavigation.Navigator 
            initialRouteName={select} 
            headerMode="screen"
        >
            <ConfirmNavigation.Screen 
                name="Buy" 
                component={Buy} 
                options={{ 
                    title: "사갈게",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("TabNavigation", { screen: "Daddy" });
                            }}
                        />
                    ),
                }}
            />
            <ConfirmNavigation.Screen 
                name="Apply" 
                component={Apply} 
                options={{ 
                    title: "사다줘",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("TabNavigation", { screen: "Daughter" });
                            }}
                        />
                    ),
                }}
            />
        </ConfirmNavigation.Navigator>
    );
};