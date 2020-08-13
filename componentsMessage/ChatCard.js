import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import TimeIapse from  "../components/TimeIapse";
import AvatarPaper from  "../components/AvatarPaper";

const Container = styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 20px;
`;

const CardMiddle = styled.View`
    flex: 1;
    flex-direction: column;
    margin-left: 10px;
`;

const CardLast = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const TimeForm = styled.Text`
    font-weight: 400;
    opacity: 0.5;
    font-size: 12px;
    padding-left: 5px;
`;

const ChatCount = styled.Text`
    border-radius: 50px;
    margin-top: 5px;
    padding: 2px 7px;
    background: ${props => props.theme.lightGreenColor};
    color: ${props => props.theme.greyColor};
    font-weight:bold;
`;

const Bold = styled.Text`
    font-weight: 600;
`;

const ChatCard = ({
    me,
    id,
    participants,
    lastMessage,
    lastMsgTime,
    unReadMsgCounter,
    handleView,
}) => {
    participants = participants.filter(participant => participant.id !== me.id);
    const avatar = participants[0].avatar;
    const userName = participants[0].userName;
    
    return (
        <Container onPress={() => handleView(id)}>
            <AvatarPaper 
                size={50}
                avatar={avatar}
            />
            <CardMiddle>
                <Bold>{userName}</Bold>
                <Text  numberOfLines={1} ellipsizeMode='tail'>
                    {lastMessage}
                </Text>
            </CardMiddle>
            <CardLast>
                <TimeForm>
                    <TimeIapse createAt={lastMsgTime} />
                </TimeForm>
                {unReadMsgCounter === 0 
                    ?   <View />
                    :   <ChatCount>{unReadMsgCounter}</ChatCount>
                }
            </CardLast>
        </Container>
    );
};

ChatCard.propTypes = {
    id: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            userName: PropTypes.string.isRequired
        })
    ).isRequired,
    unReadMsgCounter: PropTypes.number.isRequired,
    lastMessage: PropTypes.string,
    lastMsgTime: PropTypes.string,
    me: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    handleView:  PropTypes.func.isRequired
};

export default ChatCard;