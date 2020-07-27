import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import PostNone from "../components/PostNone";
import Post from "../components/Post";
import WriteApply from "../components/WriteApply";
import ViewApply from "../components/ViewApply";
import Progress from "../components/Progress";
import ProgressStap from "../components/ProgressStap";
import PostCommentBox from "../components/PostCommentBox";
import { TOGGLE_POSTEDREQ } from "./GroupQueries";

export default ({ tab, groupRoomId }) => {
    const [routeView, setRouteView] = useState("post");
    const [routePostId, setRoutePostId] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(TOGGLE_POSTEDREQ, {
        variables: { tab, groupRoomId }
    });

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

    if (loading === true){
        return <Loader />;

    } else if (data && data.togglePostedReqGroup && data.togglePostedReqGroup.length === 0) {
        return <PostNone />;
        
    } else if (!loading && data && data.togglePostedReqGroup) {
        if (routeView === "post") {
            return (
                <ScrollView 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                    }
                >
                    {data.togglePostedReqGroup.map(post => 
                        <Post 
                            {...post} 
                            key={post.id} 
                            handleRoute={handleRoute} 
                        />
                    )}
                </ScrollView>
            );
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
    }
}