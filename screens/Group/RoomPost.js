import React, { useState } from "react";
import { ScrollView, RefreshControl, View, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../../components/Loader";
import AvatarPaper from "../../components/AvatarPaper";
import GroupTab from "../../componentsGroup/GroupTab";
import GroupDaddy from "../../componentsGroup/GroupDaddy";
import GroupDaughter from "../../componentsGroup/GroupDaughter";
import FABgroupScreen from "./FABgroupScreen";
import { SEE_GROUPROOM, SEEBUY_GROUP, SEEBUYME_GROUP, items } from "./GroupQueries"

const Wrapper = styled.View`
    min-height: 89%;
`;

const RoomContainer = styled.View`
    margin: 15px;
    padding: 20px;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
`;

const SectionRight = styled.View`
    flex-direction: column;
    margin-left: 10px;
`;

const TextContainer = styled.View`
    flex-direction: row;
`;

const Container = styled.View`
    margin-top: 30px;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const MainTitle = styled.Text`
    font-size: 20px;
`;

const MainTitleBold = styled.Text`
    font-size: 20px;
    font-weight: 600;
`;

const PostContainer = styled.View`
    margin-top: 10px;
`;
    
export default ({ route: { params: { groupRoomId } }}) => {
    const [routeTab, setRouteTab] = useState("daddy");
    const [refreshing, setRefreshing] = useState(false);
    const { refetch } = useQuery(SEEBUY_GROUP, {
        variables: { 
            groupRoomId,
            pageNumber: 0,
            items
        }
    });
    const { refetch: refetchMe } = useQuery(SEEBUYME_GROUP, {
        variables: { 
            groupRoomId,
            pageNumber: 0,
            items
        }
    });
    const { data, loading } = useQuery(SEE_GROUPROOM, {
        variables: { groupRoomId }
    });

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
            await refetchMe();
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
    } else if (!loading && data && data.seeGroupRoom) {
        const { seeGroupRoom } = data;

        return (
            <Wrapper>
                <ScrollView 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                    }
                >
                    <RoomContainer>
                        <View>
                            <AvatarPaper 
                                size={100}
                                avatar={seeGroupRoom.coverPhoto} 
                            />
                        </View>
                        <SectionRight>
                            <TextContainer>
                                <MainTitle>그룹 이름: &nbsp;</MainTitle>
                                <MainTitleBold>{seeGroupRoom.roomName}</MainTitleBold>
                            </TextContainer>
                            <TextContainer>
                                <Text>그룹 회장: &nbsp;</Text>
                                <Text>{seeGroupRoom.founderUser.userName}</Text>
                            </TextContainer>
                        </SectionRight>
                    </RoomContainer>
                    <PostContainer>
                        <GroupTab 
                            routeTab={routeTab}
                            setRouteTab={setRouteTab}
                        />
                        {routeTab === "daddy"
                            ?   <GroupDaddy 
                                    groupRoomId={groupRoomId}
                                />
                            :   <GroupDaughter 
                                    groupRoomId={groupRoomId}
                                />
                        }
                    </PostContainer>
                </ScrollView>
                {routeTab === "daddy"
                    ?   <FABgroupScreen  
                            text="갈 때 사갈게 확인"
                            groupRoomId={groupRoomId}
                            select="BuyGroup" 
                            SearcheSelect="DaddyGroupSearch"
                            writeSelect="DaddyGroupWrite"
                        />
                    :   <FABgroupScreen  
                            text="올 때 사다줘 확인"
                            groupRoomId={groupRoomId}
                            select="ApplyGroup" 
                            SearcheSelect="DaughterGroupSearch"
                            writeSelect="DaughterGroupWrite"
                        />
                }
            </Wrapper>
        );
    }
};