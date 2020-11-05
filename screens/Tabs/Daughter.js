import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_BUYME } from "./TabsQueries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import PostNone from "../../components/PostNone";
import FABgroup from "../../components/FABgroup";
import WriteApply from "../../components/WriteApply";
import ViewApply from "../../components/ViewApply";
import Progress from "../../components/Progress";
import ProgressStap from "../../components/ProgressStap";
import PostCommentBox from "../../components/PostCommentBox";

const Wrapper = styled.View`
    min-height: 89%;
`;

const ContainerNone = styled.View`
    margin-top: 30px;
    margin-bottom: 100px;
    padding: 40% 0;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

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
        refetch();
    };

    useEffect(() => {
        refetch();
    }, []);
    
    if (loading) {
        return <Loader />

    } else if (routeView === "post") {
        if (data && data.seeBuyMe && data.seeBuyMe.length === 0) {
            return (
                <Wrapper>
                    <ScrollView 
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                        }
                    >
                        <ContainerNone>
                            <PostNone />
                        </ContainerNone>
                        <FABgroup 
                            text="올 때 사다줘 확인"
                            select="Apply" 
                            SearcheSelect="DaughterSearch"
                            writeSelect="DaughterWrite"
                        />
                    </ScrollView>
                </Wrapper>
            );
        } else {
            return (
                <Wrapper>
                    <ScrollView 
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                        }
                    >
                        {data && data.seeBuyMe &&
                            data.seeBuyMe.map(post => 
                                <Post 
                                    {...post} 
                                    key={post.id} 
                                    handleRoute={handleRoute} 
                                />)
                        }
                    </ScrollView>
                    <FABgroup 
                        text="올 때 사다줘 확인"
                        select="Apply" 
                        SearcheSelect="DaughterSearch"
                        writeSelect="DaughterWrite"
                    />
                </Wrapper>
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