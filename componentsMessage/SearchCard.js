import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../components/Loader";
import AvatarPaper from "../components/AvatarPaper";
import { SEARCH_USER } from "./ChatQueries";

const Touchable = styled.TouchableOpacity``;

const Wrapper = styled.View`
    margin: 30px auto;
`;

const Container = styled.View`
    flex-direction: row;
    padding: 10px 5px;
    align-items: center;
`;

const UserTextBox = styled.View`
    flex:1;
    margin: 0 10px;
`;

const Bold = styled.Text`
    font-weight: 600;
`;

const BoldAlertText = styled.Text`
    margin: 0 auto;
    font-weight: 600;
    font-size: 20px;
    color: ${props => props.theme.darkGreyColor};
`;

const BoldColor = styled.Text`
    font-weight: 600;
    color: ${props => props.theme.melonaColor};
`;

const Image = styled.Image`
    width: 200px;
    height: 150px;
`;

export default ({ 
    waitLoading, 
    searchTerm, 
    isSelfUserName, 
    handleCreateRoom 
}) => {
    const { data, loading } = useQuery(SEARCH_USER, {
        skip: searchTerm === undefined,
        variables: { 
            term: searchTerm 
        }
    });

    if (loading || waitLoading){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (searchTerm === undefined){
        return (
            <Wrapper>
                <Image 
                    resizeMode={"contain"}
                    source={require('../assets/togeter_grey.png')}
                />
                <BoldAlertText>다시 검색해주세요.</BoldAlertText>
            </Wrapper>
        );
    } else if (!loading && data && data.searchUser === undefined){
        return (
            <Wrapper>
                <Image 
                    resizeMode={"contain"}
                    source={require('../assets/togeter_grey.png')}
                />
                <BoldAlertText>다시 검색해주세요.</BoldAlertText>
            </Wrapper>
        );
    } else if (!loading && data && data.searchUser.length === 0){
        return (
            <Wrapper>
                <Image 
                    resizeMode={"contain"}
                    source={require('../assets/togeter_grey.png')}
                />
                <BoldAlertText>유저를 찾을 수 없습니다.</BoldAlertText>
            </Wrapper>
        );
    } else if(!loading && data && data.searchUser){
        const { searchUser } = data;
        
        return (
            searchUser.map(value => (
                isSelfUserName !== value.userName &&
                <Container key={value.id}>
                    <AvatarPaper 
                        avatar={value.avatar}
                    />
                    <UserTextBox>
                        <Bold>{value.userName}</Bold>
                    </UserTextBox>
                    <Touchable onPress={() => handleCreateRoom(value.userName)}>
                        <BoldColor>채팅하러가기</BoldColor>
                    </Touchable>
                </Container>
            ))
        );
    }
};