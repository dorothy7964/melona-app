import React, { useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavIcon from  "../components/NavIcon";
import TextInputPaper from  "../components/TextInputPaper";
import useInput from "../hooks/useInput";
import { SEE_CHATROOM, SEND_MESSAGE, READCOUNT_MESSAGE } from "./ChatQueries";

const Container = styled.View`
    flex-direction: row;
`;

const ConfirmButton = styled.TouchableOpacity`
    margin: 15px 0;
    margin-left: 26px;
    padding: 0 30px;
    justify-content: center;
    align-items: center;
    borderWidth: 1px;
    borderColor: ${props => props.theme.lightGreyColor};
    background-color: ${props => props.lodingIconBg
        ? props.theme.lightGreyColor
        : "#fff"
    };
`;

const SendChat = ({ chatRoomId }) => {
    const chatInput = useInput("");
    const [sendLoading, setSendLoading] = useState(false);

    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        refetchQueries:() => [{
            query: SEE_CHATROOM,
            variables:{
                id: chatRoomId
            }
        }],
        variables: {
            message: chatInput.value,
            chatRoomId
        }
    });
    const [readcountMsgMutation] = useMutation(READCOUNT_MESSAGE, {
        refetchQueries:() => [{
            query: SEE_CHATROOM,
            variables:{
                id: chatRoomId
            }
        }],
        variables: {
            chatRoomId
        }
    });

    const handleSend = async() => {
        try {
            setSendLoading(true);
            chatInput.setValue("");
            await sendMessageMutation();
            await readcountMsgMutation();
        } catch {
            console.log(e);
        } finally {
            setSendLoading(false);
        }
    };

    return (
        <Container>
            <TextInputPaper
                { ...chatInput }
                placeholder="작성해주세요."
                returnKeyType="send"
                disabled={sendLoading}
            />
            <ConfirmButton 
                lodingIconBg={sendLoading}
                onPress={handleSend}>
                <NavIcon
                    size={27}
                    focused={sendLoading ? false : true}
                    name={Platform.OS === "ios" 
                        ? "ios-send" 
                        : "md-send"
                    }
                />
            </ConfirmButton>
        </Container>
    );
};

SendChat.propTypes = {
    chatRoomId: PropTypes.string.isRequired,
};

export default SendChat;
