import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import NavIcon from "./NavIcon";
import AvatarPaper from "./AvatarPaper";

const Wrapper = styled.View`
    flex-direction: column;
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
`;

const HeaderContainer = styled.View`
    margin-left: 10px;
`;

const Bold = styled.Text`
    width: 280px;
    font-size: 15px;
    font-weight: 500;
`;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    width: 100%;
    margin-top: 10px;
    justify-content: flex-end;
    flex-direction: row;
    overflow: hidden;
`;

const LocationContainer = styled.View`
    align-items: flex-end;
    margin-right: 5px;
    flexGrow: 1;
    flex: 1;
`;

const LocationText = styled.Text``;

const LastDateText = styled.Text`
    margin-left: 5px;
`;

const UserCard = ({ avatar, userName, location, lastDate }) => (
    <Wrapper>
        <Header>
            <Touchable>
                <AvatarPaper avatar={avatar} />
            </Touchable>
            <HeaderContainer>
                <Touchable>
                    <Bold>{userName}</Bold>
                </Touchable>
            </HeaderContainer>
        </Header>
        <Container>
            <LocationContainer>
                <LocationText>{location}</LocationText>
            </LocationContainer>
            <NavIcon
                size={20}
                focused={false}
                name={Platform.OS === "ios" 
                    ? "ios-airplane" 
                    : "md-airplane"
                }
            />
            <LastDateText>{lastDate}</LastDateText>
        </Container>
    </Wrapper>
);

UserCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    lastDate: PropTypes.string.isRequired,
};

export default UserCard;