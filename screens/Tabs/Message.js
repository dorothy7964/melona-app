import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, Platform } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import Loader from "../../components/Loader";
import NavIcon from  "../../components/NavIcon";
import ChatCard from "../../componentsMessage/ChatCard";
import ChatRoom from "../../componentsMessage/ChatRoom";
import SendChat from "../../componentsMessage/SendChat";
import SearchCard from "../../componentsMessage/SearchCard";

import { 
    CHATROOMS_QUERY, 
    READCOUNT_MESSAGE,
    DELETE_CHATROOM,
    CREATE_CHATROOM
} from "./TabsQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 10px;
    padding: 20px;
    min-height: 620px;
`;
                            

const SearchContainer = styled.View`
    flex-direction: row;
`;

const SearchUserBox = styled.View`
    margin-top: 10px;
`;

const InputBox = styled.View`
    flex: 1;
`;

const IconBox = styled.View`
    margin-left: 10px;
    align-items: center;
    justify-content: center;
`;

const ChatCardBox = styled.View`
    flex: 1;
`;

const ImageBox = styled.View`
    margin: 0 auto;
    margin-top: 150px;
`;

const Image = styled.Image`
    width: 200px;
    height: 150px;
`;

const Bold = styled.Text`
    font-size: 20px;
    font-weight:600;
    color: ${props => props.theme.darkGreyColor};
    margin: 0 auto;
`;

const SearchInput = styled(TextInput)`
    flex: 1;
`;

export default () => {
    const userName = useInput("");
    const [view, setView] = useState("chatCard");
    const [waitLoading, setWaitLoading] = useState(false);
    const [chatRoomId, setChatRoomId] = useState(""); 
    const [refreshing, setRefreshing] = useState(false);
    const [readcountMsgMutation] = useMutation(READCOUNT_MESSAGE);
    const [deleteChatRoomMutaion] = useMutation(DELETE_CHATROOM);
    const [createChatRoomMutaion] = useMutation(CREATE_CHATROOM);
    const { data, loading, refetch } = useQuery(CHATROOMS_QUERY);

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

    const handleView = async(chatRoomId) => {
        setChatRoomId(chatRoomId);
        if (view === "chatCard") {
            setView("chatRoom");
            try {
                await readcountMsgMutation({
                    refetchQueries:() => [{
                        query: CHATROOMS_QUERY,
                    }],
                    variables: {
                        chatRoomId
                    }
                }); 
            } catch (e) {
                console.log(e);
            }
        } else {
            setView("chatCard");
        }
    };

    const handleDeleteRoom = async(chatRoomId) => {
        try {
            setWaitLoading(false);
            setView("chatCard");
            await deleteChatRoomMutaion({
                refetchQueries:() => [{
                    query: CHATROOMS_QUERY
                }],
                variables: {
                    chatRoomId
                }
            }); 
        } catch(e) {
            console.log(e);
        } finally {
            setWaitLoading(false);
        }
    };

    const handleCreateRoom = async(userName) => {
        try {
            setWaitLoading(true);
            const {
                data: { createChatRoom }
            } = await createChatRoomMutaion({
                refetchQueries:() => [{
                    query: CHATROOMS_QUERY,
                }],
                variables:{
                    userName
                }
            });
            setView("chatRoom");
            handleView(createChatRoom.id);
            setChatRoomId(createChatRoom.id);
            handleRemoveText();
        } catch(e){
            console.log(e);
        } finally {
            setWaitLoading(false);
        }
    };

    const handleRemoveText = () => {
        userName.onChange("");
    };

    useEffect(() => {
        refetch();
    }, []);

    if (loading) {
        return <Loader />
        
    } else if (!loading && data && data.seeChatRooms) {
        const { seeChatRooms } = data;

        if (view === "chatCard") {
            return (
                <Container>
                    <ScrollView 
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                        }
                    >
                        <SearchContainer>
                            <InputBox>
                                <SearchInput  
                                    mode="outlined"
                                    disabled={false}
                                    label="채팅할 유저 검색"
                                    value={userName.value}
                                    onChangeText={userName.onChange}
                                    placeholder="채팅할 유저 검색"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={true}
                                    secureTextEntry={false}
                                    returnKeyType="search"
                                />
                            </InputBox>
                            {userName.value.length !== 0 &&
                            <IconBox>
                                <Touchable onPress={handleRemoveText}>
                                    <NavIcon
                                        size={27}
                                        focused={false}
                                        name={Platform.OS === "ios" 
                                            ? "ios-close" 
                                            : "md-close"
                                        }
                                    />
                                </Touchable>
                            </IconBox>}
                        </SearchContainer>
                        {userName.value.length !== 0 &&
                        <SearchUserBox>
                            <SearchCard
                                waitLoading={waitLoading}
                                searchTerm={userName.value}
                                isSelfUserName={data.me.userName}
                                handleCreateRoom={handleCreateRoom}
                            />
                        </SearchUserBox>}
                        {userName.value.length === 0 &&
                        <ChatCardBox>
                            {seeChatRooms.length === 0 
                                ?   <ImageBox>
                                        <Image 
                                            resizeMode={"contain"}
                                            source={require('../../assets/togeter_grey.png')}
                                        />
                                        <Bold>채팅방이 비어있습니다.</Bold>
                                    </ImageBox>
                                :   seeChatRooms.map(chatRoom => 
                                        <ChatCard   
                                            {...chatRoom}
                                            key={chatRoom.id}
                                            me={data.me}
                                            handleView={handleView}
                                        />
                                    )
                            }
                        </ChatCardBox>}
                    </ScrollView>
                </Container>
            );
        } else if (view === "chatRoom") {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                    }
                > 
                    <Container>
                        <ChatRoom 
                            chatRoomId={chatRoomId}
                            waitLoading={waitLoading}
                            handleView={handleView}
                            handleDeleteRoom={handleDeleteRoom}
                        />
                        <SendChat 
                            chatRoomId={chatRoomId}
                        />
                    </Container>
                </ScrollView>
            );
        }
    }
};