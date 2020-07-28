import React from "react";
import { Alert } from "react-native";
import { Button, Dialog, Portal } from 'react-native-paper';
import { useMutation } from 'react-apollo-hooks';
import styled from "styled-components";
import PropTypes from "prop-types";
import AvatarPaper from "../components/AvatarPaper";
import PlusCheck from "./PlusCheck";
import { DELETE_MEMBER } from "./GroupQueries";
import { ALL_GROUPROOM } from "../screens/Group/GroupQueries";

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
`;

const BoldMargin = styled.Text`
    font-size: 15px;
    font-weight: 600;
    margin: 0 10px;
    flex: 1;
`;

const Bold = styled.Text`
    font-size: 15px;
    font-weight: 600;
`;

const BoldGrey = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.darkGreyColor};
`;

const GroupRemoveDialogPaper = ({
    roomName,
    participants,
    groupRoomId,
    groupMemberId,
    founderUserName,
    visible,
    handleToggleDialog
}) => {
    let removeUserArr = [];
    let filterUser = participants.filter(user => user.userName !== founderUserName);

    const [deleteUserMemberMutation] = useMutation(DELETE_MEMBER,  {
        refetchQueries: () => [{
            query: ALL_GROUPROOM,
            variables: { groupRoomId }
        }]
    });

    const handleConfirm = async(button) => {
        handleToggleDialog();
        if ( removeUserArr.length === 0 || button === "cancel") {
            return;

        } else {
            try {
                await deleteUserMemberMutation({
                    variables: {
                        groupMemberId,
                        userNameArr: removeUserArr
                    }
                });
                return Alert.alert("인원이 삭제 되었습니다.");
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleToggleDialog}
            >
                <Dialog.Title>{`그룹 인원 삭제 [ ${roomName} ] `}</Dialog.Title>
                <Dialog.Content>
                    {filterUser.map((user) => (
                        <Container key={user.id}>
                            <AvatarPaper 
                                avatar={user.avatar}
                            />
                            <BoldMargin>{user.userName}</BoldMargin>
                            <PlusCheck
                                key={user.id}
                                userName={user.userName}
                                checkUserArr={removeUserArr}
                                checkColor="red"
                            />
                        </Container>
                    ))}
                    </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => handleConfirm("cancel")}>
                        <BoldGrey>취소</BoldGrey>
                    </Button>
                    <Button onPress={() => handleConfirm("confirm")}>
                        <Bold>확인</Bold>
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

GroupRemoveDialogPaper.propTypes = {
    roomName: PropTypes.string.isRequired,
    participants: PropTypes.array,
    groupRoomId: PropTypes.string.isRequired,
    groupMemberId: PropTypes.string.isRequired,
    founderUserName: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    handleToggleDialog: PropTypes.func.isRequired,
};

export default GroupRemoveDialogPaper;