import React from "react";
import { Platform, View } from "react-native";
import { Avatar } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import NavIcon from "./NavIcon";
import AvatarPaper from "./AvatarPaper";
        
const Touchable = styled.TouchableOpacity``;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
`;

const IconBox = styled.View`
    margin: 20px 60px;
    padding: 20px;
    align-items: center;
    borderWidth: 1px;
    borderColor: ${props => props.theme.lightGreyColor};
`;
        
const Bold = styled.Text`
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
    flex: 1;
`;

const ProgressCardPost = ({ 
    avatar,
    userName,
    progress,
    handleAction
}) => (
    <View >
        <Header>
            <AvatarPaper 
                avatar={avatar}
            />
            <Bold>{userName}</Bold>
            <NavIcon
                focused={false}
                size={24}
                name={Platform.OS === "ios" 
                    ? "ios-text" 
                    : "md-text"
                }
            />
        </Header>
        <IconBox>
            {progress
                ?   <Touchable>
                        <Avatar.Image 
                            size={60} 
                            style={{ backgroundColor: "#fff" }}
                            source={require('../assets/melona_success.png')}
                        />
                    </Touchable>
                :   <Touchable onPress={() => handleAction("user", userName)}>
                        <Avatar.Image 
                            size={60} 
                            style={{ backgroundColor: "#fff" }}
                            source={require('../assets/melona_failure.png')}
                        />
                    </Touchable>
            }
        </IconBox>
    </View>
);

ProgressCardPost.propTypes = {
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    progress: PropTypes.bool.isRequired,
    handleAction: PropTypes.func.isRequired,
};

export default ProgressCardPost;