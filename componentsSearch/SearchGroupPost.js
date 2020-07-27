import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types"; 
import Post from "../components/Post";
import Loader from "../components/Loader";
import PostNone from "../components/PostNone";
import { SEARCH_POST_GROUP } from "./SearchQueries";
import { SEARCHME_POST_GROUP } from "./SearchQueries";

const LoadingContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const SearchGroupPost = ({ 
    term, 
    queryType,
    groupRoomId,
    handleRoute,
    handlePostLoading
}) => {
    if (queryType === "daddy") {
        const { data, loading } = useQuery(SEARCH_POST_GROUP, {
            skip: term === undefined,
            variables: { term, groupRoomId }
        });

        if (loading === true){
            handlePostLoading(true);
            return (
                <LoadingContainer>
                    <Loader />
                    <Text>검색 중...</Text>
                </LoadingContainer>
            );

        } else if (!loading && data && data.searchPostGroup.length === 0) {
            handlePostLoading(false);
            return <PostNone />;

        } else if (!loading && data && data.searchPostGroup) {
            const { searchPostGroup } = data;
            handlePostLoading(false);
            
            return (
                <View>
                    {searchPostGroup.map(post => 
                        <Post 
                            {...post} 
                            key={post.id} 
                            handleRoute={handleRoute} 
                        />
                    )}
                </View>
            );
        }
    } else if (queryType === "daughter") {
        const { data, loading } = useQuery(SEARCHME_POST_GROUP, {
            skip: term === undefined,
            variables: { term, groupRoomId }
        });

        if (loading === true){
            handlePostLoading(true);
            return (
                <LoadingContainer>
                    <Loader />
                    <Text>검색 중...</Text>
                </LoadingContainer>
            );

        } else if (!loading && data && data.searchMePostGroup.length === 0) {
            handlePostLoading(false);
            return <PostNone />;

        } else if (!loading && data && data.searchMePostGroup) {
            const { searchMePostGroup } = data;
            handlePostLoading(false);
            
            return (
                <View>
                    {searchMePostGroup.map(post => 
                        <Post 
                            {...post} 
                            key={post.id} 
                            handleRoute={handleRoute} 
                        />
                    )}
                </View>
            );
        }
    }
};

SearchGroupPost.propTypes = {
    term: PropTypes.string.isRequired,
    queryType: PropTypes.string.isRequired,
    groupRoomId: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
    handlePostLoading: PropTypes.func.isRequired,
};

export default SearchGroupPost;