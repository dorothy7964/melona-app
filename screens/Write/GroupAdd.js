import React, { useState } from "react";
import { ScrollView, RefreshControl, Text } from "react-native";

export default () => {
    const [refreshing, setRefreshing] = useState(false);

    const refresh = async () => {
        try {
            setRefreshing(true);
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
            <Text>GroupAdd</Text>
        </ScrollView>
    );
};