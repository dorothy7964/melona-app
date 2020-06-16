import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import NavIcon from "./NavIcon";
import AvatarPaper from "./AvatarPaper";

const Header = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Container = styled.View`
    flex-direction: column;
    margin-left: 10px;
`;

const LocationContainer = styled.View`
    justify-content: flex-end;
    flex-direction: row;
    margin-right: 10px;
`;

const Bold = styled.Text`
    width: 280px;
    font-size: 15px;
    font-weight: 500;
`;

const Touchable = styled.TouchableOpacity``;

const Text = styled.Text`
    margin-left: 5px;
`;

const UserCard = ({ avatar, userName, location, lastDate }) => (
    <Header>
        <Touchable>
            <AvatarPaper avatar={avatar} />
        </Touchable>
        <Container>
            <Touchable>
                <Bold>{userName}</Bold>
            </Touchable>
            <LocationContainer>
                <Text>{location}</Text>
                <Text>
                    <NavIcon
                        size={20}
                        focused={false}
                        name={Platform.OS === "ios" 
                            ? "ios-airplane" 
                            : "md-airplane"
                        }
                    />
                </Text>
                <Text>{lastDate}</Text>
            </LocationContainer>
        </Container>
    </Header>
);

UserCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    lastDate: PropTypes.string.isRequired,
};

export default UserCard;