import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DaddySearch from "../screens/Search/DaddySearch";
import DaughterSearch from "../screens/Search/DaughterSearch";

const SearchNavigation = createStackNavigator();

export default ({ route: { params: { SearcheSelect } } }) => {
    return (
        <SearchNavigation.Navigator initialRouteName={SearcheSelect} headerMode="none">
            <SearchNavigation.Screen name="DaddySearch" component={DaddySearch} />
            <SearchNavigation.Screen name="DaughterSearch" component={DaughterSearch} />
        </SearchNavigation.Navigator>
    );
};