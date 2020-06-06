import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    background-color: ${props => props.theme.melonaColor};
    width: ${constants.width / 1.7};
    padding: 10px;
    margin: 0px 50px;
    border-radius: 4px;
`;

const Text = styled.Text`
    color: white;
    text-align: center;
    font-weight: 600;
`;

const AuthButton = ({ onPress, text }) => (
    <Touchable onPress={onPress}>
        <Container>
            <Text>{text}</Text>
        </Container>
    </Touchable>
);

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default AuthButton;