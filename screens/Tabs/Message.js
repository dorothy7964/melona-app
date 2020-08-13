import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import Loader from "../../components/Loader";
import ChatCard from "../../componentsMessage/ChatCard";
import ChatRoom from "../../componentsMessage/ChatRoom";
import { Card } from "react-native-paper";
import { useQuery, useMutation } from "react-apollo-hooks";
import { 
    CHATROOMS_QUERY, 
    READCOUNT_MESSAGE,
    DELETE_CHATROOM
} from "./TabsQueries";

const Container = styled(Card)`
    margin: 10px;
    min-height: 620px;
    padding: 20px;
`;

export default () => {
    const [view, setView] = useState("chatCard");
    const [chatRoomId, setChatRoomId] = useState(""); 
    const [refreshing, setRefreshing] = useState(false);
    const [readcountMsgMutation] = useMutation(READCOUNT_MESSAGE);
    const [deleteChatRoomMutaion] = useMutation(DELETE_CHATROOM);
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

    const handleDeleteRoom = async(chatRoomId)=>{
        try {
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
        }
    };

    if (loading === true) {
        return <Loader />;
        
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
                        {seeChatRooms.map(chatRoom => 
                            <ChatCard   
                                {...chatRoom}
                                key={chatRoom.id}
                                me={data.me}
                                handleView={handleView}
                            />
                        )}
                    </ScrollView>
                </Container>
            );
        } else if (view === "chatRoom") {
            return (
                <Container>
                    <ScrollView 
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                        }
                    >
                        <ChatRoom 
                            chatRoomId={chatRoomId}
                            handleView={handleView}
                            handleDeleteRoom={handleDeleteRoom}
                        />
                    </ScrollView>
                </Container>
            );
        }
    }
};