import React from "react";
import { Button, Dialog, Portal } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import AvatarPaper from "../components/AvatarPaper";

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
`;

const BoldMargin = styled.Text`
    font-size: 15px;
    font-weight: 600;
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-size: 15px;
    font-weight: 600;
`;

const GroupUserDialogPaper = ({
    participants,
    visible,
    handleToggleDialog
}) => (
    <Portal>
        <Dialog
            visible={visible}
            onDismiss={handleToggleDialog}
        >
            <Dialog.Title>그룹 인원 보기</Dialog.Title>
            <Dialog.Content>
                {participants.map((user) => (
                    <Container key={user.id}>
                        <AvatarPaper 
                            avatar={user.avatar}
                        />
                        <BoldMargin>{user.userName}</BoldMargin>
                    </Container>
                ))}
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleToggleDialog}>
                    <Bold>확인</Bold>
                </Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
);

GroupUserDialogPaper.propTypes = {
    groupRoomMember: PropTypes.array,
    visible: PropTypes.bool.isRequired,
    handleToggleDialog: PropTypes.func.isRequired,
};

export default GroupUserDialogPaper;