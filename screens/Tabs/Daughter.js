import React, { useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_BUYME } from "./TabsQueries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import FABgroup from "../../components/FABgroup";
import WriteApply from "../../components/WriteApply";

export default () => {
    const [routeView, setRouteView] = useState("post");
    const [routePostId, setRoutePostId] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEE_BUYME);

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
                            data && data.seeBuyMe &&
                            data.seeBuyMe.map(post => 
                                <Post 
                                    {...post} 
                                    key={post.id} 
                                    handleRoute={handleRoute} 
                                />)
                    )}
                </ScrollView>
                <FABgroup 
                    text="올 때 사다줘 확인"
                    select="Apply" 
                    SearcheSelect="DaughterSearch"
                    writeSelect="DaughterWrite"
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