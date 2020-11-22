import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { Card } from "react-native-paper";
import styled from "styled-components";
import ChatRoom from "../../componentsMessage/ChatRoom";
import SendChat from "../../componentsMessage/SendChat";
import {  
    CHATROOMS_QUERY, 
    DELETE_CHATROOM,
} from "../Tabs/TabsQueries";

const Container = styled(Card)`
    margin: 10px;
    padding: 20px;
    min-height: 620px;
`;

export default ({ route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [waitLoading, setWaitLoading] = useState(false);
    const [deleteChatRoomMutaion] = useMutation(DELETE_CHATROOM);

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

    const handleDeleteRoom = async(chatRoomId) => {
        try {
            setWaitLoading(false);
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
    
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        > 
            <Container>
                <ChatRoom 
                    cover={true}
                    chatRoomId={route.name}
                    waitLoading={waitLoading}
                    handleView={null}
                    handleDeleteRoom={handleDeleteRoom}
                />
                <SendChat 
                    chatRoomId={route.name}
                />
            </Container>
        </ScrollView>
    );
};