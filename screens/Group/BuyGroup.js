import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform } from "react-native";
import styled from "styled-components";
import NavIcon from "../../components/NavIcon";
import IconTab from "../../components/IconTab";
import GroupApplyRes from "../../componentsGroup/GroupApplyRes";
import GroupApplyReq from "../../componentsGroup/GroupApplyReq";

const Touchable = styled.TouchableOpacity``;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
`;

export default ({ navigation, route: { params: { groupRoomId } }}) => {
    const [tab, setTab] = useState("applyRes");
    const [refreshing, setRefreshing] = useState(false);
    
    const refresh = async () => {
        try {
            setRefreshing(true);
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
            <IconTab 
                tab={tab}
                setTab={setTab}
                anotherPage={false}
            />
            <Touchable  onPress={() => {
                navigation.navigate("RoomPost", { groupRoomId });
            }}>
                <BackButtonContainer>
                    <NavIcon
                        focused={false}
                        name={Platform.OS === "ios" 
                            ? "ios-arrow-back" 
                            : "md-arrow-back"
                        }
                    />
                </BackButtonContainer>
            </Touchable>
            {tab === "applyRes"
                ?   <GroupApplyRes 
                        tab="daddy"
                        groupRoomId={groupRoomId}
                    />
                :   <GroupApplyReq 
                        tab="daddy"
                        groupRoomId={groupRoomId}
                    />
            }
        </ScrollView>
    );
};