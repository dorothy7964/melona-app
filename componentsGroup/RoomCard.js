import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

const RoomCard = ({
    groupRoomId,
    handleRoute
}) => {
    return (
        <View>
            <Text>{groupRoomId}</Text>
        </View>
    );
};

RoomCard.propTypes = {
    groupRoomId: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
};

export default RoomCard;