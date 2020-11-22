import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import DaddyChat from "../screens/Chat/DaddyChat";

const ChatNavigation = createStackNavigator();

export default ({ route: { params: { ChatSelect, UserName, RoomId } } }) => {
    const navigation = useNavigation();  

    return (
        <ChatNavigation.Navigator 
            initialRouteName={ChatSelect} 
            headerMode="screen"
        >
            <ChatNavigation.Screen 
                name={RoomId}
                component={DaddyChat}
                options={{ 
                    title: `${UserName} 채팅 하기`,
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
        </ChatNavigation.Navigator>
    );
};