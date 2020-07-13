import React from "react";
import { Avatar } from 'react-native-paper';
import PropTypes from "prop-types";

const AvatarPaper = ({ avatar, size = 40 }) => {
    if (avatar === "https://image.flaticon.com/icons/svg/401/401155.svg"){
        return (
            <Avatar.Image 
                size={size} 
                source={require('../assets/avatar.png')}
            />
        );
    } else {
        return (
            <Avatar.Image 
                size={size} 
                source={{ uri: avatar }}
            />
        );
    }
};

AvatarPaper.propTypes = {
    avatar: PropTypes.string.isRequired,
    size: PropTypes.number,
};

export default AvatarPaper;