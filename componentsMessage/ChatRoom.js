import React from "react";
import { View, Text, Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavIcon from  "../components/NavIcon";

const Touchable = styled.TouchableOpacity``;

const UserNameBox = styled.View`
    flex: 1;
    align-items: center;
`;

const Header = styled.View`
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
`;

const RedText = styled.Text`
    color: ${props => props.theme.redColor};
`;

const Bold = styled.Text`
    font-weight: 600;
`;

const ChatRoom = ({ 
    chatRoomId, 
    handleView, 
    handleDeleteRoom 
}) => {
    return (
        <View>
            <Header>
                <Touchable onPress={() => handleView("")}>
                    <NavIcon 
                        focused={false}
                        name={Platform.OS === "ios" 
                            ? "ios-arrow-back" 
                            : "md-arrow-back"
                        }
                    />
                </Touchable>
                <UserNameBox>
                    <Bold>유저이름</Bold>
                </UserNameBox>
                <Touchable onPress={() => handleDeleteRoom(chatRoomId)}>
                    <RedText>채팅방 나가기</RedText>
                </Touchable>
            </Header>
            <Text>Message</Text>
        </View>
    );
};

ChatRoom.propTypes = {
    chatRoomId: PropTypes.string.isRequired,
    handleView: PropTypes.func.isRequired,
    handleDeleteRoom: PropTypes.func.isRequired,
};

export default ChatRoom;