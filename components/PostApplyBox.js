import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { Avatar } from 'react-native-paper';
import { useMutation } from "react-apollo-hooks";
import { DELETE_CONTENTS, FALSE_APPLY, UNCONNECT_CONTENTSREQ } from "../SharedQueries";
import DialogPaper from "./DialogPaper";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Text = styled.Text`
    margin-left: 5px;
`;

const Touchable = styled.TouchableOpacity``;

const PostApplyBox = ({
    postId,
    anotherPage,
    isApply,
    isApplyWait,
    isApplyReadCheck,
    handleRoute
}) => {
    const [falseApplyMutation] = useMutation(FALSE_APPLY);
    const [deleteContentsMutation] = useMutation(DELETE_CONTENTS);
    const [unConnectContentsReqMutation] = useMutation(UNCONNECT_CONTENTSREQ);
    
    // DialogPaper
    const [visible, setVisible] = useState(false);

    const handleToggleDialog = () => {
        setVisible(!visible);
    };

    const handleAbort = () => {
        handleToggleDialog();
        return Alert.alert("신청을 취소하지 않습니다.");
    };

    const handleCancel = async(postId) => {
        handleToggleDialog();
        try {
            await deleteContentsMutation({
                variables: {
                    postId
                } 
            });
            await falseApplyMutation({
                variables: {
                    postId
                }   
            }); 
            await unConnectContentsReqMutation({
                variables: {
                    postId
                }   
            }); 
        } catch (e) {
            console.log(e);
        }
        handleRoute("post", "");
        return Alert.alert("신청을 취소 합니다.");
    };

    if (isApply === false && isApplyReadCheck === false) {
        return (
            <Touchable onPress={() => handleRoute("writeApply", postId)}>
                <Container>
                    <Avatar.Image 
                        size={30} 
                        style={{ backgroundColor: "#fff" }}
                        source={
                            !anotherPage 
                                ? require('../assets/melona_basic.png')
                                : require('../assets/req_basic.png')
                        }
                    />
                    <Text>올 때 메로나</Text>
                </Container>
            </Touchable>
        );
    } else if (isApply === true && isApplyWait === true ) {
        return (
            <Touchable onPress={() => handleToggleDialog()}>
                <Container>
                    <DialogPaper 
                        title="갈 때 사갈게"
                        postId={postId}
                        visible={visible}
                        handleAbort={handleAbort}
                        handleCancel={handleCancel}
                        handleToggleDialog={handleToggleDialog}
                    />
                    <Avatar.Image 
                        size={30} 
                        style={{ backgroundColor: "#fff" }}
                        source={
                            !anotherPage 
                                ? require('../assets/melona_waiting.png')
                                : require('../assets/req_waiting.png')
                        }
                    />
                    <Text>대기 중...</Text>
                </Container>
            </Touchable>
        );
    } else if (isApply === true && isApplyReadCheck === true) {
        return (
            <Touchable>
                <Container>
                    <Avatar.Image 
                        size={30} 
                        style={{ backgroundColor: "#fff" }}
                        source={
                            !anotherPage 
                                ? require('../assets/melona_success.png')
                                : require('../assets/req_success.png')
                        }
                    />
                    <Text>신청 완료</Text>
                </Container>
            </Touchable>
        );
    } else if (isApply === true && isApplyReadCheck === false) {
        return (
            <Touchable>
                <Container>
                    <Avatar.Image 
                        size={30} 
                        style={{ backgroundColor: "#fff" }}
                        source={
                            !anotherPage 
                                ? require('../assets/melona_failure.png')
                                : require('../assets/req_failure.png')
                        }
                    />
                    <Text>신청 실패</Text>
                </Container>
            </Touchable>
        );
    }
};

PostApplyBox.propTypes = {
    postId: PropTypes.string.isRequired,
    anotherPage: PropTypes.bool.isRequired,
    isApply: PropTypes.bool.isRequired,
    isApplyWait: PropTypes.bool.isRequired,
    isApplyReadCheck: PropTypes.bool.isRequired,
    handleRoute: PropTypes.func.isRequired,
};

export default PostApplyBox;