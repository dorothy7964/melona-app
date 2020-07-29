import React, { useState } from "react";
import { Platform } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import NavIcon from "../components/NavIcon";
import SplitCeatedAt from "../components/SplitCeatedAt";
import GroupUserDialogPaper from "./GroupUserDialogPaper";
import GroupNameEditDialogPaper from "./GroupNameEditDialogPaper";
import GroupUserPlusDialogPaper from "./GroupUserPlusDialogPaper";
import GroupRemoveDialogPaper from "./GroupRemoveDialogPaper";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 15px;
    padding: 15px;
`;

const ViewGroupBox = styled.View`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 10px;
`;

const SectionFirst = styled.View`
    flex-direction: row;
    align-items: center;
`;

const SectionLast = styled.View`
    margin-top: 5px;
    flex-direction: row;
`;

const Bold = styled.Text`
    font-weight: 600;
    margin-right: 10px;
    color: ${props => props.theme.melonaColor};
`;

const BoldBorder = styled.Text`
    font-weight: 600;
    padding: 10px;
    margin-right: 10px;
    borderRadius: 10px;
    borderWidth: 1px;
    borderColor: ${props => props.theme.melonaColor};
    color: ${props => props.theme.melonaColor};
`;

const BoldBorderRed = styled.Text`
    font-weight: 600;
    padding: 10px;
    borderRadius: 10px;
    borderWidth: 1px;
    borderColor: ${props => props.theme.redColor};
    color: ${props => props.theme.redColor};
`;

const GroupCard = ({ 
    groupRoomId,
    coverPhoto,
    roomName,
    founderUser,
    founderUserName,
    groupMemberId,
    participants,
    createdAt,
    onPress,
}) => {
    // DialogPaper
    const [groupUserVisible, setGroupUserVisible] = useState(false);
    const [groupNameEditVisible, setGroupNameEditVisible] = useState(false);
    const [groupUserPlusVisible, setGroupUserPlusVisible] = useState(false);
    const [groupUserRemoveVisible, setGroupUserRemoveVisible] = useState(false);

    const handleGroupUser = () => {
        setGroupUserVisible(!groupUserVisible);
    };

    const handleGroupNameEdit = () => {
        setGroupNameEditVisible(!groupNameEditVisible);
    };

    const handleGroupUserPlus = () => {
        setGroupUserPlusVisible(!groupUserPlusVisible);
    };

    const handleGroupUserRemove = () => {
        setGroupUserRemoveVisible(!groupUserRemoveVisible);
    };

    return (
        <Container>
            <Touchable onPress={onPress}>
                <Card.Cover source={{ uri: `${coverPhoto}` }} />
                <Card.Content>
                    <Title>{roomName}</Title>
                    <Paragraph>
                        <SplitCeatedAt 
                            createdAt={createdAt}
                        />
                    </Paragraph>
                </Card.Content>
            </Touchable>
            <Card.Actions>
                <ViewGroupBox>
                    <Touchable onPress={handleGroupUser}>
                        <SectionFirst>
                            <Bold>그룹 인원 보기</Bold>
                            {founderUser &&
                            <NavIcon
                                size={23}
                                focused={true}
                                name={Platform.OS === "ios" 
                                    ? "ios-contact" 
                                    : "md-contact"
                                }
                            />}
                        </SectionFirst>
                    </Touchable>
                    {founderUser &&
                    <SectionLast>
                        <Touchable onPress={handleGroupNameEdit}>
                            <BoldBorder>그룹 이름 편집</BoldBorder>
                        </Touchable>
                        <Touchable onPress={handleGroupUserPlus}>
                            <BoldBorder>인원 추가</BoldBorder>
                        </Touchable>
                        <Touchable onPress={handleGroupUserRemove}>
                            <BoldBorderRed>인원 삭제</BoldBorderRed>
                        </Touchable>
                    </SectionLast>}
                    <GroupUserDialogPaper 
                        roomName={roomName}
                        participants={participants}
                        visible={groupUserVisible}
                        handleToggleDialog={handleGroupUser}
                    />
                    <GroupNameEditDialogPaper 
                        roomName={roomName}
                        groupRoomId={groupRoomId}
                        visible={groupNameEditVisible}
                        handleToggleDialog={handleGroupNameEdit}
                    />
                    <GroupUserPlusDialogPaper 
                        roomName={roomName}
                        participants={participants}
                        groupRoomId={groupRoomId}
                        groupMemberId={groupMemberId}
                        visible={groupUserPlusVisible}
                        handleToggleDialog={handleGroupUserPlus}
                    />
                    <GroupRemoveDialogPaper 
                        roomName={roomName}
                        participants={participants}
                        groupRoomId={groupRoomId}
                        groupMemberId={groupMemberId}
                        founderUserName={founderUserName}
                        visible={groupUserRemoveVisible}
                        handleToggleDialog={handleGroupUserRemove}
                    />
                </ViewGroupBox>
            </Card.Actions>
        </Container>
    );
};

GroupCard.propTypes = {
    groupRoomId: PropTypes.string.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    roomName: PropTypes.string.isRequired,
    founderUser: PropTypes.bool.isRequired,
    founderUserName: PropTypes.string.isRequired,
    groupMemberId: PropTypes.string.isRequired,
    participants: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default GroupCard;