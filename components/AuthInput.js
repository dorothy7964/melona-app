import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    background-color: ${props => props.theme.greyColor};
    width: ${constants.width / 1.7};
    padding: 10px;
    border: 0.5px solid ${props => props.theme.darkGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
    onChange,
    placeholder,
    value,
    keyboardType="default",
    autoCapitalize="none",
    autoCorrect=true,
    secureTextEntry=false,
    returnKeyType="done",
    onSubmitEditing = () => null
}) => (
    <Container>
        <TextInput 
            onChangeText={onChange}
            placeholder={placeholder}
            value={value}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
        />
    </Container>
);

AuthInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    autoCorrect: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onSubmitEditing: PropTypes.func,
    keyboardType: PropTypes.oneOf([
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad"
    ]),
    autoCapitalize: PropTypes.oneOf([
        "none", 
        "sentences", 
        "words", 
        "characters"
    ]),
    returnKeyType: PropTypes.oneOf([
        "done", 
        "go", 
        "next", 
        "search",
        "send"
    ]),
};

export default AuthInput;