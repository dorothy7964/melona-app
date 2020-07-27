import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import RoomCard from "../screens/Group/RoomCard";
import RoomPost from "../screens/Group/RoomPost";
import FABgroupScreen from "../screens/Group/FABgroupScreen";
import BuyGroup from "../screens/Group/BuyGroup";
import DaddyGroupSearch from "../screens/Group/DaddyGroupSearch";
import DaddyGroupWrite from "../screens/Group/DaddyGroupWrite";
import ApplyGroup from "../screens/Group/ApplyGroup";
import DaughterGroupSearch from "../screens/Group/DaughterGroupSearch";
import DaughterGroupWrite from "../screens/Group/DaughterGroupWrite";

const GroupNavigation = createStackNavigator();

export default ({ route: { params: { GroupSelect } } }) => {
    const navigation = useNavigation();

    return (
        <GroupNavigation.Navigator 
            initialRouteName={GroupSelect} 
            headerMode="screen"
        >
            <GroupNavigation.Screen 
                name="RoomCard" 
                component={RoomCard}
                options={{ 
                    title: "그룹 전체 보기",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    )
                }}
            />
            <GroupNavigation.Screen 
                name="RoomPost"
                component={RoomPost} 
                options={{ 
                    title: "그룹 보기",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("RoomCard");
                            }}
                        />
                    )
                }}
            />
            <GroupNavigation.Screen 
                name="FABgroupScreen"
                component={FABgroupScreen} 
            />
            <GroupNavigation.Screen 
                name="BuyGroup"
                component={BuyGroup} 
                options={{ 
                    title: "그룹 - 사갈게",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("RoomCard");
                            }}
                        />
                    )
                }}
            />
            <GroupNavigation.Screen 
                name="DaddyGroupSearch"
                component={DaddyGroupSearch} 
                options={{ 
                    title: "그룹 - 갈 때 사갈게 찾기",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("RoomCard");
                            }}
                        />
                    )
                }}
            />
            <GroupNavigation.Screen 
                name="DaddyGroupWrite"
                component={DaddyGroupWrite} 
                options={{ 
                    title: "그룹 - 갈 때 사갈게 게시물 작성",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("RoomCard");
                            }}
                        />
                    )
                }}
            />
            <GroupNavigation.Screen 
                name="ApplyGroup"
                component={ApplyGroup} 
                options={{ 
                    title: "그룹 -사다줘",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("RoomCard");
                            }}
                        />
                    )
                }}
            />
            
            <GroupNavigation.Screen 
                name="DaughterGroupSearch"
                component={DaughterGroupSearch} 
                options={{ 
                    title: "그룹 - 올 때 사다줘 찾기",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("RoomCard");
                            }}
                        />
                    )
                }}
            />
            <GroupNavigation.Screen 
                name="DaughterGroupWrite"
                component={DaughterGroupWrite} 
                options={{ 
                    title: "그룹 - 올 때 사다줘 게시물 작성",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "15%"
                    },
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate("RoomCard");
                            }}
                        />
                    )
                }}
            />
        </GroupNavigation.Navigator>
    );
};