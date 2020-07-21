import React, { useState } from "react";
import { Platform, ScrollView, RefreshControl, Alert } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../../components/Loader";
import NavIcon from "../../components/NavIcon";
import TextInputPaper from "../../components/TextInputPaper";
import FriendSearch from "../../componentsSearch/FriendSearch";
import FriendListCard from "../../componentsSearch/FriendListCard";
import useInput from "../../hooks/useInput";
import { SEE_FOLLOWING, TOGGLE_FOLLOW } from "./FriendQueries";

const Wrapper = styled.View`
    margin-top: 30px;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Container = styled.View`
    margin: 15px;
`;

const TitleBox = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${props => props.theme.lightGreyColor};
`;

const SearchBox = styled.View`
    padding: 20px 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;

const SearchUserBox = styled.View`
    padding: 0 20px;
    padding-bottom: 30px;
    background-color: #fff;
`;

const IconBox = styled.TouchableOpacity`
    margin-left: 10px;
`;

const Image = styled.Image`
    width: 200px;
    height: 100px;
`;

export default () => {
    const termInput = useInput("");
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEE_FOLLOWING);
    const [toggleFollowMutation] = useMutation(TOGGLE_FOLLOW);

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

    const handleResetTerm = () => {
        termInput.setValue("");
    };

    // 친구 추가.삭제
    const handleToggleFollow = async(userName, isFollowing, route) => {

        try {
            if (isFollowing === true) {
                Alert.alert(`${userName} 님과 친구 연결이 해제 되었습니다.`);
            } else {
                Alert.alert(`${userName} 님과 친구 연결이 되었습니다.`);
            }
            await toggleFollowMutation({
                variables: {
                    userName
                }
            });
            handleResetTerm();
            refresh();

        } catch (e) {
            console.log(e);
        } finally {
            setSearchRefetch(false);
        }
    }

    if (loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (!loading && data && data.seeFollowing) {
        const { seeFollowing } = data;

        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                <Container>
                    <TitleBox>
                        <Image 
                            resizeMode={"contain"}
                            source={require('../../assets/friendList.png')}
                        />
                    </TitleBox>
                    <SearchBox>
                        <TextInputPaper
                            { ...termInput }
                            placeholder="유저이름 · 이메일 검색"
                        />
                        {termInput.value !== "" &&
                        <IconBox onPress={handleResetTerm}>
                            <NavIcon
                                size={35}
                                focused={false}
                                name={Platform.OS === "ios" 
                                    ? "ios-backspace" 
                                    : "md-backspace" 
                                }
                            />
                        </IconBox>}
                    </SearchBox>
                    {termInput.value !== "" &&
                    <SearchUserBox>
                        <FriendSearch
                            term={termInput.value}
                            handleToggleFollow={handleToggleFollow}
                        />
                    </SearchUserBox>}
                    {seeFollowing.map(user => (
                        <FriendListCard 
                            key={user.id}
                            avatar={user.avatar}
                            userName={user.userName}
                            isFollowing={user.isFollowing}
                            onPress={() =>  handleToggleFollow(user.userName, user.isFollowing, "listCard")}
                        />
                    ))}
                </Container>
            </ScrollView>
        );
    }
};