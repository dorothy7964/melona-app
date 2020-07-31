import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Post from "../components/Post";
import Loader from "../components/Loader";
import PostNone from "../components/PostNone";
import WriteApply from "../components/WriteApply";
import ViewApply from "../components/ViewApply";
import Progress from "../components/Progress";
import ProgressStap from "../components/ProgressStap";
import PostCommentBox from "../components/PostCommentBox";
import { SEEBUY_GROUP, items } from "./GroupQueries";

const Container = styled.View`
    min-height: 430px;
`;

export default ({ groupRoomId }) => {
    const [routeView, setRouteView] = useState("post");
    const [routePostId, setRoutePostId] = useState("");
    const { data, loading, refetch } = useQuery(SEEBUY_GROUP, {
        variables: { 
            groupRoomId,
            pageNumber: 0,
            items
        }
    });

    const handleRoute = (route, postId) => {
        setRouteView(route);
        setRoutePostId(postId);
        refetch();
    };

    if (routeView === "post") {
        if (loading === true) {
            return (
                <Container>
                    <Loader />
                </Container>
            );
        } else if (!loading && data && data.seeBuyGroup && data.seeBuyGroup.length === 0) {
            return (
                <Container>
                    <PostNone />
                </Container>
            );
        } else if (!loading && data && data.seeBuyGroup) {
            const { seeBuyGroup } = data;
            
            return (
                <Container>
                    {seeBuyGroup.map(post => 
                        <Post 
                            {...post} 
                            key={post.id} 
                            handleRoute={handleRoute} 
                        />
                    )}
                </Container>
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