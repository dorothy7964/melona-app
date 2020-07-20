import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../../components/Loader";
import PostNone from "../../components/PostNone";
import GroupCard from "../../componentsGroup/GroupCard";
import { ALL_GROUPROOM } from "./TabsQueries";

const View = styled.View`
    margin-top: 30px;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(ALL_GROUPROOM);

    // 그룹 방 클릭 시
    const handleEnter = (groupRoomId) => {
        console.log(groupRoomId)
    };

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

    if (loading === true){
        return (
            <View>
                <Loader />
            </View>
        );
        
    } else if (!loading && data && data.allGroupRoom.length === 0) {
        return (
            <View>
                <PostNone />
            </View>
        );
    } else if (!loading && data && data.allGroupRoom) {
        const { allGroupRoom } = data;

        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                {allGroupRoom.map(groupRoom => (
                   <GroupCard 
                        key={groupRoom.id}
                        groupRoomId={groupRoom.id}
                        coverPhoto={groupRoom.coverPhoto}
                        roomName={groupRoom.roomName}
                        founderUser={groupRoom.founderUser.isSelf}
                        participants={groupRoom.groupRoomMember[0].participants}
                        createdAt={groupRoom.createdAt}
                        handleEnter={handleEnter}
                   />
                ))}
            </ScrollView>
        );
    }
};