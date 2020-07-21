import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import DaddyWrite from "../screens/Write/DaddyWrite";
import DaughterWrite from "../screens/Write/DaughterWrite";
import GroupAdd from "../screens/Write/GroupAdd";

const WriteNavigation = createStackNavigator();

export default ({ route: { params: { writeSelect } } }) => {
    const navigation = useNavigation();

    return (
        <WriteNavigation.Navigator 
            initialRouteName={writeSelect} 
            headerMode="screen"
        >
            <WriteNavigation.Screen 
                name="DaddyWrite" 
                component={DaddyWrite}
                options={{ 
                    title: "갈 때 사갈게 게시물 작성",
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
            <WriteNavigation.Screen 
                name="DaughterWrite"
                component={DaughterWrite} 
                options={{ 
                    title: "올 때 사다줘 게시물 작성",
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
            <WriteNavigation.Screen 
                name="GroupAdd"
                component={GroupAdd} 
                options={{ 
                    title: "그룹 추가",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("TabNavigation", { screen: "Group" });
                            }}
                        />
                    ),
                }}
            />
        </WriteNavigation.Navigator>
    );
};