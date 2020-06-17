import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_BUY } from "./TabsQueries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEE_BUY);

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
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
            {loading
                ?   <Loader /> 
                :   (
                    data && data.seeBuy &&
                    data.seeBuy.map(post => <Post key={post.id} {...post} />)
            )}
        </ScrollView>
    );
};