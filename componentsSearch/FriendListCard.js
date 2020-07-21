import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import AvatarPaper from "../components/AvatarPaper";
import NavIcon from "../components/NavIcon";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    background-color: #fff;
    borderTopWidth: 1px;
    borderTopColor: ${props => props.theme.lightGreyColor};
    flex-direction: row;
    align-items: center;
    padding: 15px;
`;

const Bold = styled.Text`
    flex: 1;
    font-size: 17px;
    margin: 0 10px;
`;

const FriendListCard = ({ 
    avatar,
    userName,
    isFollowing,
    onPress,
}) => (
    <Container>
        <AvatarPaper
            avatar={avatar} 
        />
        <Bold>{userName}</Bold>
        <Touchable onPress={onPress}>
            <NavIcon
                size={20}
                focused={false}
                name={Platform.OS === "ios" 
                    ? isFollowing 
                        ? "ios-trash" 
                        : "ios-person-add" 
                    : isFollowing 
                        ? "md-trash" 
                        : "md-person-add" 
                }
            />
        </Touchable>
    </Container>
);

FriendListCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default FriendListCard;