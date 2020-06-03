import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const MaterailTab = createBottomTabNavigator();
const MaterialTabNavi = () => {
    return (
        <MaterailTab.Navigator  
            tabBarOptions={{
                activeTintColor: '#b9dd39',
                inactiveTintColor: '#999',
                style: {
                    backgroundColor: '#eee',
                },
                labelStyle: {
                    textAlign: 'center',
                    fontSize: 14,
                },
                indicatorStyle: {
                    borderBottomColor: '#9ccc65',
                    borderBottomWidth: 2,
                },
          }}>
            <MaterailTab.Screen 
                name="SelectPhoto" 
                component={SelectPhoto} 
            />
            <MaterailTab.Screen 
                name="TakePhoto"
                component={TakePhoto} 
            />
        </MaterailTab.Navigator>
    );
};

const Stack = createStackNavigator();
export default () => {
    return (
        <Stack.Navigator 
            initialRouteName="MaterialTabNavi"
        >
            <Stack.Screen 
                name="MaterialTabNavi" 
                component={MaterialTabNavi} 
                options={{
                    title: "photo",
                    headerTitleStyle: {
                        alignSelf: "center"
                    }
                }}
            />
            <Stack.Screen 
                name="UploadPhoto" 
                component={UploadPhoto} 
                options={{
                    title: "UploadPhoto",
                    headerTitleStyle: {
                        alignSelf: "center"
                    }
                }}
            />
        </Stack.Navigator>
    );
};
