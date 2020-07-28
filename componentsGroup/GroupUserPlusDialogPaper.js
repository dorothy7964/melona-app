import React from "react";
import { Alert } from "react-native";
import { Button, Dialog, Portal } from 'react-native-paper';
import { useQuery, useMutation } from 'react-apollo-hooks';
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../components/Loader";
import AvatarPaper from "../components/AvatarPaper";
import PlusCheck from "./PlusCheck";
import { ADDMEMBER_LIST, ADD_MEMBER } from "./GroupQueries";
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

const GroupUserPlusDialogPaper = ({
    roomName,
    participants,
    groupRoomId,
    groupMemberId,
    visible,
    handleToggleDialog
}) => {
    let plusUserArr = [];
    let userNameArr = [];
    participants.map(user => (
        userNameArr.push(user.userName)
    ));
    const { data, loading } = useQuery(ADDMEMBER_LIST, {
        variables: {
            userNameArr
        }
    });
    const [addUserMemberMutation] = useMutation(ADD_MEMBER,  {
        refetchQueries: () => [{
            query: ALL_GROUPROOM,
            variables: { groupRoomId }
        }]
    });

    const handleConfirm = async(button) => {
        handleToggleDialog();
        if (plusUserArr.length === 0 || button === "cancel") {
            return;
            
        } else {
            try {
                await addUserMemberMutation({
                    variables: {
                        groupMemberId,
                        userNameArr: plusUserArr
                    }
                });
                return Alert.alert("인원이 추가 되었습니다.");
            } catch (e) {
                console.log(e);
            }
        }
    };

    if (loading === true) {
        return <Loader />
    } else if (!loading && data && data.addMemberList) {
        const { addMemberList } = data;

        return (
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={handleToggleDialog}
                >
                    <Dialog.Title>{`그룹 인원 추가 [ ${roomName} ] `}</Dialog.Title>
                    <Dialog.Content>
                        {addMemberList.map((user) => (
                            <Container key={user.id}>
                                <AvatarPaper 
                                    avatar={user.avatar}
                                />
                                <BoldMargin>{user.userName}</BoldMargin>
                                <PlusCheck
                                    key={user.id}
                                    userName={user.userName}
                                    checkUserArr={plusUserArr}
                                    checkColor="default"
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
    }
};

GroupUserPlusDialogPaper.propTypes = {
    roomName: PropTypes.string.isRequired,
    participants: PropTypes.array,
    groupRoomId: PropTypes.string.isRequired,
    groupMemberId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    handleToggleDialog: PropTypes.func.isRequired,
};

export default GroupUserPlusDialogPaper;