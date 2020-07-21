import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import DaddySearch from "../screens/Search/DaddySearch";
import DaughterSearch from "../screens/Search/DaughterSearch";
import GroupFriend from "../screens/Search/GroupFriend";

const SearchNavigation = createStackNavigator();

export default ({ route: { params: { SearcheSelect } } }) => {
    const navigation = useNavigation();  

    return (
        <SearchNavigation.Navigator 
            initialRouteName={SearcheSelect} 
            headerMode="screen"
        >
            <SearchNavigation.Screen 
                name="DaddySearch" 
                component={DaddySearch} 
                options={{ 
                    title: "갈 때 사갈게 찾기",
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
            <SearchNavigation.Screen 
                name="DaughterSearch" 
                component={DaughterSearch} 
                options={{ 
                    title: "올 때 사다줘 찾기",
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
            <SearchNavigation.Screen 
                name="GroupFriend" 
                component={GroupFriend} 
                options={{ 
                    title: "친구 목록 보기",
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
        </SearchNavigation.Navigator>
    );
};