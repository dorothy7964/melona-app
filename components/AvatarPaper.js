import React from "react";
import { Avatar } from 'react-native-paper';
import PropTypes from "prop-types";

const AvatarPaper = ({ avatar }) => {
    if (avatar === "https://image.flaticon.com/icons/svg/401/401155.svg"){
        return (
            <Avatar.Image 
                size={40} 
                source={require('../assets/avatar.png')}
            />
        );
    } else {
        return (
            <Avatar.Image 
                size={40} 
                source={{ uri: avatar }}
            />
        );
    }
};

AvatarPaper.propTypes = {
    avatar: PropTypes.string.isRequired,
};

export default AvatarPaper;