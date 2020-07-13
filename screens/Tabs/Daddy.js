import React, { useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_BUY } from "./TabsQueries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import PostNone from "../../components/PostNone";
import FABgroup from "../../components/FABgroup";
import WriteApply from "../../components/WriteApply";
import ViewApply from "../../components/ViewApply";
import Progress from "../../components/Progress";
import ProgressStap from "../../components/ProgressStap";
import PostCommentBox from "../../components/PostCommentBox";

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
        refetch();
    };

    if (routeView === "post") {
        if (data && data.seeBuy && data.seeBuy.length === 0) {
            return <PostNone />;
            
        } else {
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
        }
    } else if (routeView === "writeApply") {
        return (
            <WriteApply 
                postId={routePostId}
                handleRoute={handleRoute}
            />
        );
    } else if (routeView === "viewApply") {
        return (
            <ViewApply 
                postId={routePostId}
                handleRoute={handleRoute}
            />
        );
    } else if (routeView === "progress") {
        return (
            <Progress 
                postId={routePostId}
                handleRoute={handleRoute}
            />
        );
    } else if (routeView === "progressStap") {
        return (
            <ProgressStap 
                postId={routePostId}
                handleRoute={handleRoute}
            />
        );
    } else if (routeView === "postCommentBox") {
        return (
            <PostCommentBox 
                postId={routePostId}
                handleRoute={handleRoute}
            />
        );
    }
};