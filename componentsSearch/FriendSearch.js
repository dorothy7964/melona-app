import React from "react";
import { Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../components/Loader";
import FriendListCard from "./FriendListCard";
import { SEARCH_USER } from "./SearchQueries";

const Wrapper = styled.View`
    borderWidth: 1px;
    borderColor: ${props => props.theme.lightGreyColor};
    padding: 20px 10px;
    align-items: center;
`;

const Container = styled.View`
    borderWidth: 1px;
    borderColor: ${props => props.theme.lightGreyColor};
`;

const TitleBox = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${props => props.theme.lightGreyColor};
`;

const Image = styled.Image`
    width: 200px;
    height: 100px;
`;

export default ({ 
   term,
   handleToggleFollow
}) => {
    const { data, loading, refetch } = useQuery(SEARCH_USER, {
        skip:  term === "",
        variables: { term }
    });

    const handleClick = (userName, isFollowing) => {
        handleToggleFollow(userName, isFollowing);
        refetch();
    };

    if ( data === undefined) {
        return <Text />;
    } else if (term === "") {
        return <Text />;

    } else if (loading === true) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (data.searchUser.length === 0) {
        return (
            <Wrapper>
                <Text>검색을 찾을 수 없습니다.</Text>
            </Wrapper>
        );
    } else if (!loading && data && data.searchUser) {
        const { searchUser } = data;

        return (
            <Container>
                <TitleBox>
                    <Image 
                        resizeMode={"contain"}
                        source={require('../assets/friendSearch.png')}
                    />
                </TitleBox>
                {searchUser.map(user => (
                    <FriendListCard 
                        key={user.id}
                        avatar={user.avatar}
                        userName={user.userName}
                        isFollowing={user.isFollowing}
                        onPress={() =>  handleClick(user.userName, user.isFollowing)}
                    />
                ))}
            </Container>
        );
    }
};