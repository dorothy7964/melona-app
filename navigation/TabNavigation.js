import 'react-native-gesture-handler';
import * as React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Daddy from "../screens/Tabs/Daddy";
import Daughter from "../screens/Tabs/Daughter";
import Group from "../screens/Tabs/Group";
import Message from "../screens/Tabs/Message";
import Profile from "../screens/Tabs/Profile";
import NavText from "../components/NavText";
import NavIcon from "../components/NavIcon";
import StackFactory from "./StackFactory";

const TabNavigation = createBottomTabNavigator();

export default () => {
    return (
        <TabNavigation.Navigator>
            <TabNavigation.Screen 
                name="갈 때 사갈게" 
                component={StackFactory}   
                options={{
                    tabBarLabel: ({ focused }) => (
                        <NavText 
                            text="갈 때 사갈게"
                            focused={focused}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={ Platform.OS === "ios"
                                ? "ios-checkbox-outline" 
                                : "md-checkbox-outline"
                            }
                        />
                    )
                }} 
                initialParams={{
                    initialRoute: Daddy,
                    customConfig: {
                        title: "갈 때 사갈게",
                        headerTitleStyle: {
                            alignSelf: "center"
                        },
                    }
                }}
            />
            <TabNavigation.Screen 
                name="올 때 사다줘" 
                component={StackFactory}  
                options={{
                    tabBarLabel: ({ focused }) => (
                        <NavText 
                            text="올 때 사다줘"
                            focused={focused}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" 
                                ? "ios-checkbox-outline" 
                                : "md-checkbox-outline"
                            }
                        />
                    )
                }} 
                initialParams={{
                    initialRoute: Daughter,
                    customConfig: {
                        title: "올 때 사다줘",
                        headerTitleStyle: {
                            alignSelf: "center"
                        },
                    }
                }}
            />
            <TabNavigation.Screen
                name="그룹"
                component={StackFactory} 
                options={{
                    tabBarLabel: ({ focused }) => (
                        <NavText 
                            text="그룹"
                            focused={focused}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" 
                                ? "ios-people" 
                                : "md-people"
                            }
                        />
                    )
                }}
                initialParams={{
                    initialRoute: Group,
                    customConfig: {
                        title: "그룹",
                        headerTitleStyle: {
                            alignSelf: "center"
                        }
                    }
                }}
            />
            <TabNavigation.Screen
                name="메시지" 
                component={StackFactory}  
                options={{
                    tabBarLabel: ({ focused }) => (
                        <NavText 
                            text="메시지"
                            focused={focused}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" 
                                ? "ios-text" 
                                : "md-text"
                            }
                        />
                    )
                }}
                initialParams={{
                    initialRoute: Message,
                    customConfig: {
                        title: "메시지",
                        headerTitleStyle: {
                            alignSelf: "center"
                        }
                    }
                }}
            />
            <TabNavigation.Screen
                name="프로필" 
                component={StackFactory}  
                options={{
                    tabBarLabel: ({ focused }) => (
                        <NavText 
                            text="프로필"
                            focused={focused}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" 
                                ? "ios-person" 
                                : "md-person"
                            }
                        />
                    )
                }}
                initialParams={{
                    initialRoute: Profile,
                    customConfig: {
                        title: "프로필",
                        headerTitleStyle: {
                            alignSelf: "center"
                        }
                    }
                }}
            />
        </TabNavigation.Navigator>
    );
};