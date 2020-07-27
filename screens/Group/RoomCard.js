import React, { useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../../components/Loader";
import PostNone from "../../components/PostNone";
import GroupCard from "../../componentsGroup/GroupCard";
import FABgroupRoom from "../../componentsGroup/FABgroupRoom";
import { ALL_GROUPROOM } from "./GroupQueries";

const Container = styled.View`
    margin-top: 30px;
    margin-bottom: 100px;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(ALL_GROUPROOM);

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
            <Container>
                <Loader />
            </Container>
        );
        
    } else if (!loading && data && data.allGroupRoom.length === 0) {
        return (
            <Container>
                <PostNone />
            </Container>
        );
    } else if (!loading && data && data.allGroupRoom) {
        const { allGroupRoom } = data;
        
        return (
            <View>
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
                            onPress={() => navigation.navigate(
                                "RoomPost", { groupRoomId: groupRoom.id }
                            )}
                    />
                    ))}
                </ScrollView>
                <FABgroupRoom 
                    SearcheSelect="GroupFriend"
                    writeSelect="GroupAdd" 
                />
            </View>
        );
    }
};