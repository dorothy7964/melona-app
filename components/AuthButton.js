import React from "react";
import { ActivityIndicator } from "react-native";
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

const AuthButton = ({ onPress, text, loading = false }) => (
    <Touchable disabled={loading} onPress={onPress}>
        <Container>
            {loading 
                ? <ActivityIndicator color="white" /> 
                : <Text>{text}</Text> 
            }
        </Container>
    </Touchable>
);

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default AuthButton;