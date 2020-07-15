import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import WriteApply from "../../components/WriteApply";
import ViewApply from "../../components/ViewApply";
import Progress from "../../components/Progress";
import ProgressStap from "../../components/ProgressStap";
import PostCommentBox from "../../components/PostCommentBox";
import SearchForm from "../../componentsSearch/SearchForm";
import SearchPost from "../../componentsSearch/SearchPost";

export default () => {
    const [term, setTerm] = useState("");
    const [routeView, setRouteView] = useState("post");
    const [routePostId, setRoutePostId] = useState("");
    const [postLoading, setPostLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleRoute = (route, postId) => {
        setRouteView(route);
        setRoutePostId(postId);
    };

    const handleSubmit = (value) => {
        setTerm(value);
    };

    const handlePostLoading = (bool) => {
        setPostLoading(bool);
    };

    const refresh = async () => {
        try {
            setRefreshing(true);
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    
    if (routeView === "post") {
        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                <SearchForm 
                    postLoading={postLoading}
                    handleSubmit={handleSubmit}
                />
                <SearchPost 
                    term={term}
                    queryType="daughter"
                    handleRoute={handleRoute}
                    handlePostLoading={handlePostLoading}
                />
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
};