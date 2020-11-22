import React, { useState, useEffect } from "react";
import { Platform, ScrollView, RefreshControl, View } from "react-native";
import { useQuery } from "react-apollo-hooks";
import ReadMore from 'react-native-read-more-text';
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from  "../components/Loader";
import NavIcon from  "../components/NavIcon";
import AvatarPaper from  "../components/AvatarPaper";
import TimeIapse from  "../components/TimeIapse";
import styles from "../styles";
import { SEE_CHATROOM } from "./ChatQueries";

const Touchable = styled.TouchableOpacity``;

const UserNameBox = styled.View`
    flex: 1;
    margin-left: 50px;
    align-items: center;
`;

const Header = styled.View`
    padding-bottom: 10px;
    flex-direction: row;
    align-items: center;
    borderBottomWidth: 1px;
    borderBottomColor:  ${props => props.theme.lightGreyColor};
`;

const Content = styled.View`
    padding: 20px 0;
    max-height: 470px;
    min-height: 470px;
`;

const MessageContainer  = styled.View`
    display:flex;
    flex-direction: row;
    margin-bottom: 5px;
`;

const MessageBubble = styled.View`
    flex-direction: column;
    margin-left: 10px;
    background-color: ${props => props.bg} !important;
    padding: 10px;
    max-width: 260px;
    border-radius: 5px;
`;

const MessageText = styled.Text`
    flex: 1;
    font-size:12px;
    lineHeight: 20px;
`;

const TimeForm = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
`;

const TimeFormText = styled.Text`
    font-weight: 400;
    font-size: 10px;
    opacity: 0.5;
`;

const MoreFooterText = styled.Text`
    margin-top: 10px;
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.darkGreyColor};
`;

const RedText = styled.Text`
    color: ${props => props.theme.redColor};
`;

const Bold = styled.Text`
    font-weight: 600;
`;

const ChatRoom = ({ 
    cover = false,
    chatRoomId, 
    waitLoading,
    handleView, 
    handleDeleteRoom 
}) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEE_CHATROOM, {
        variables: {
            id: chatRoomId
        }
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

    const renderTruncatedFooter = (handlePress) => {
        return (
            <MoreFooterText onPress={handlePress}>
                더보기...
            </MoreFooterText>
        );
    }
    
    const renderRevealedFooter = (handlePress) => {
        return (
            <MoreFooterText onPress={handlePress}>
                더보기 닫기
            </MoreFooterText>
        );
    }
    
    const handleTextReady = () => {
        return;
    };

    useEffect(() => {
        refetch();
    }, []);

    if (loading === true) {
        return <Loader />;

    } else if(!loading && data && data.seeChatRoom){
        const me = data.me.id;
        const { messages } = data.seeChatRoom;
        const { participants } = data.seeChatRoom;
        const toUser = participants.filter(participant => participant.id !== me);
        const toUserName =  toUser[0].userName;

        return (
            <View>
                <Header>
                    {cover
                        ?   <View />
                        :   <Touchable onPress={() => handleView("")}>
                                <NavIcon 
                                    focused={false}
                                    name={Platform.OS === "ios" 
                                        ? "ios-arrow-back" 
                                        : "md-arrow-back"
                                    }
                                />
                            </Touchable>
                    }
                    <UserNameBox>
                        <Bold numberOfLines={1} ellipsizeMode='tail'>
                            {toUserName}
                        </Bold>
                    </UserNameBox>
                    {cover
                        ?   <View />
                        :   <Touchable onPress={() => handleDeleteRoom(chatRoomId)}>
                                {waitLoading
                                    ?   <Loader />
                                    :   <RedText>채팅방 나가기</RedText>
                                }    
                            </Touchable>
                    }
                </Header>
                <Content>
                    <ScrollView 
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                        }
                    >
                        {messages.length === 0 
                            ?   <MessageText /> 
                            :   messages.map(message =>
                                    message.from.id !== me
                                    ?   <MessageContainer key={message.id} >
                                            <AvatarPaper avatar={message.from.avatar} />
                                            <MessageBubble bg={styles.lightGreyColor}>
                                                <ReadMore
                                                    numberOfLines={5}
                                                    renderTruncatedFooter={renderTruncatedFooter}
                                                    renderRevealedFooter={renderRevealedFooter}
                                                    onReady={handleTextReady}>
                                                    <MessageText>
                                                        {message.text}
                                                    </MessageText>
                                                </ReadMore>
                                                <TimeForm>
                                                    <TimeFormText>
                                                        <TimeIapse createAt={message.createdAt} />
                                                    </TimeFormText>
                                                </TimeForm>
                                            </MessageBubble>
                                        </MessageContainer>
                                    :   <MessageContainer key={message.id} style={{ justifyContent: 'flex-end' }}>
                                            <MessageBubble bg={styles.yellowColor}>
                                                <ReadMore
                                                    numberOfLines={5}
                                                    renderTruncatedFooter={renderTruncatedFooter}
                                                    renderRevealedFooter={renderRevealedFooter}
                                                    onReady={handleTextReady}>
                                                    <MessageText>
                                                        {message.text}
                                                    </MessageText>
                                                </ReadMore>
                                                <TimeForm>
                                                    <TimeFormText>
                                                        <TimeIapse createAt={message.createdAt} />
                                                    </TimeFormText>
                                                </TimeForm> 
                                            </MessageBubble>
                                        </MessageContainer>
                                )
                        }
                    </ScrollView>
                </Content>
            </View>
        );
    }
};

ChatRoom.propTypes = {
    chatRoomId: PropTypes.string.isRequired,
    handleView: PropTypes.func.isRequired,
    handleDeleteRoom: PropTypes.func.isRequired,
};

export default ChatRoom;