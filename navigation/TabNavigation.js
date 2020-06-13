import 'react-native-gesture-handler';
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Daddy from "../screens/Tabs/Daddy";
import Daughter from "../screens/Tabs/Daughter";
import Group from "../screens/Tabs/Group";
import Message from "../screens/Tabs/Message";
import Profile from "../screens/Tabs/Profile";
import StackFactory from "./StackFactory";

const TabNavigation = createBottomTabNavigator();

export default () => {
    return (
        <TabNavigation.Navigator>
            <TabNavigation.Screen 
                name="갈 때 사갈게" 
                component={StackFactory} 
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