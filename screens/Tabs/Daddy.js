import React, { useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_BUY } from "./TabsQueries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import FABgroup from "../../components/FABgroup";
import WriteApply from "../../components/WriteApply";

export default () => {
    const [routeView, setRouteView] = useState("post");
    const [routePostId, setRoutePostId] = useState("");
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

    const handleRoute = (route, postId) => {
        setRouteView(route);
        setRoutePostId(postId);
    };

    if (routeView === "post") {
        return (
            <View>
                <ScrollView 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                    }
                >
                    {loading
                        ?   <Loader /> 
                        :   (
                            data && data.seeBuy &&
                            data.seeBuy.map(post => 
                                <Post 
                                    {...post} 
                                    key={post.id} 
                                    handleRoute={handleRoute} 
                                />)
                    )}
                </ScrollView>
                <FABgroup 
                    text="갈 때 사갈게 확인"
                    select="Buy" 
                    SearcheSelect="DaddySearch"
                    writeSelect="DaddyWrite"
                />
            </View>
        );
    } else if (routeView === "writeApply") {
        return (
            <WriteApply 
                postId={routePostId}
                handleRoute={handleRoute}
            />
        );
    }
};