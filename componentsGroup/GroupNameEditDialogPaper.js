import React from "react";
import { Alert } from "react-native";
import { Button, Dialog, Portal } from 'react-native-paper';
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextInputPaper from "../components/TextInputPaper";
import useInput from "../hooks/useInput";
import { EDIT_GROUPROOM } from "./GroupQueries";
import { ALL_GROUPROOM } from "../screens/Group/GroupQueries";

const InputBox = styled.View`
    margin: 15px auto;
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

const GroupNameEditDialogPaper = ({
    roomName,
    groupRoomId,
    visible,
    handleToggleDialog
}) => {
    const groupNameInput = useInput("");

    const [editGroupRoomMutation] = useMutation(EDIT_GROUPROOM,  {
        refetchQueries: () => [{
            query: ALL_GROUPROOM,
            variables: { groupRoomId }
        }]
    });

    const handleConfirm = async(button, roomName) => {
        handleToggleDialog();
        if (button === "confirm") {
            try {
                await editGroupRoomMutation({
                    variables: {
                        groupRoomId,
                        roomName
                    }
                });
                Alert.alert("그룹 이름이 변경 되었습니다.");
            } catch (e) {
                console.log(e);
            }
        }
        groupNameInput.setValue("");
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={handleToggleDialog}
            >
                <Dialog.Title>{`그룹 이름 편집 [ ${roomName} ]`}</Dialog.Title>
                <Dialog.Content>
                    <BoldGrey>변경 할 그룹 이름 작성을 작성 해주세요.</BoldGrey>
                    <InputBox>
                        <TextInputPaper 
                            { ...groupNameInput }
                            placeholder="그룹 이름"
                        />
                    </InputBox>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => handleConfirm("cancel")}>
                        <BoldGrey>취소</BoldGrey>
                    </Button>
                    <Button onPress={() => handleConfirm("confirm", groupNameInput.value)}>
                        <Bold>변경</Bold>
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

GroupNameEditDialogPaper.propTypes = {
    roomName: PropTypes.string.isRequired,
    groupRoomId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    handleToggleDialog: PropTypes.func.isRequired,
};

export default GroupNameEditDialogPaper;