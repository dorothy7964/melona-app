import React, { useState } from "react";
import { Platform } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import NavIcon from "../components/NavIcon";
import SplitCeatedAt from "../components/SplitCeatedAt";
import GroupUserDialogPaper from "./GroupUserDialogPaper";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 15px;
    padding: 15px;
`;

const ViewGroupBox = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-weight: 600;
    margin-right: 10px;
    color: ${props => props.theme.melonaColor};
`;

const GroupCard = ({ 
    groupRoomId,
    coverPhoto,
    roomName,
    founderUser,
    participants,
    createdAt,
    handleEnter,
}) => {
    // DialogPaperPhoto
    const [visible, setVisible] = useState(false);

    const handleToggleDialog = () => {
        setVisible(!visible);
    };

    return (
        <Container>
            <Touchable onPress={() => handleEnter(groupRoomId)}>
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
                <Touchable onPress={handleToggleDialog}>
                    <ViewGroupBox>
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
                        <GroupUserDialogPaper 
                            participants={participants}
                            visible={visible}
                            handleToggleDialog={handleToggleDialog}
                        />
                    </ViewGroupBox>
                </Touchable>
            </Card.Actions>
        </Container>
    );
};

GroupCard.propTypes = {
    groupRoomId: PropTypes.string.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    roomName: PropTypes.string.isRequired,
    founderUser: PropTypes.bool.isRequired,
    participants: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
    handleEnter: PropTypes.func.isRequired,
};

export default GroupCard;