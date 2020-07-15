import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types"; 
import Post from "../components/Post";
import Loader from "../components/Loader";
import PostNone from "../components/PostNone";
import { SEARCH_POST } from "./SearchQueries";

const LoadingContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const SearchPost = ({ 
    term, 
    queryType,
    handleRoute,
    handlePostLoading
}) => {
    if (queryType === "daddy") {
        const { data, loading } = useQuery(SEARCH_POST, {
            skip: term === undefined,
            variables: { term }
        });

        if (loading === true){
            handlePostLoading(true);
            return (
                <LoadingContainer>
                    <Loader />
                    <Text>검색 중...</Text>
                </LoadingContainer>
            );

        } else if (!loading && data && data.searchPost.length === 0) {
            handlePostLoading(false);
            return <PostNone />;

        } else if (!loading && data && data.searchPost) {
            const { searchPost } = data;
            handlePostLoading(false);
            
            return (
                <View>
                    {searchPost.map(post => 
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
        return null;
    }
};

SearchPost.propTypes = {
    term: PropTypes.string.isRequired,
    queryType: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
    handlePostLoading: PropTypes.func.isRequired,
};

export default SearchPost;