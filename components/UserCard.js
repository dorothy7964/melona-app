import React from "react";
import { Platform } from "react-native";
import { Badge } from 'react-native-paper';
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "../styles";
import NavIcon from "./NavIcon";
import AvatarPaper from "./AvatarPaper";

const Wrapper = styled.View`
    flex-direction: column;
`;

const Text = styled.Text``;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
`;

const HeaderContainer = styled.View`
    margin-left: 10px;
    display: flex;
    flex: 1;
`;

const CountContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const MarginRight = styled.View`
    margin-right: 5px;
`;

const Bold = styled.Text`
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

const LastDateText = styled.Text`
    margin-left: 5px;
`;

const UserCard = ({ 
    avatar, 
    userName, 
    applysCount,
    location, 
    lastDate,
}) => (
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
            {applysCount !== 0 
                ?   (
                        <CountContainer>
                            <MarginRight>
                                <NavIcon
                                    size={20}
                                    focused={false}
                                    name={Platform.OS === "ios" 
                                        ? "ios-people" 
                                        : "md-people"
                                    }
                                />
                            </MarginRight>
                            <Badge
                                size={25}
                                style={{
                                    color: "#fff",
                                    fontWeight: "600",
                                    backgroundColor: styles.melonaColor
                                }}
                            >
                                {` 신청자 ${applysCount} 명 `}
                            </Badge>
                        </CountContainer>
                    )
                :   <Text />
            }
        </Header>
        <Container>
            <LocationContainer>
                <Text>{location}</Text>
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
    applysCount: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    lastDate: PropTypes.string.isRequired,
};

export default UserCard;