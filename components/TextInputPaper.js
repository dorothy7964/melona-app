import React from "react";
import { TextInput } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
    width: ${constants.width / 1.7};
    margin-bottom: 10px;
`;

const TextInputPaper = ({
    value, 
    onChange, 
    placeholder, 
    keyboardType="default",
    autoCapitalize="none",
    autoCorrect=true,
    secureTextEntry=false,
    disabled=false,
    returnKeyType="done",
    onSubmitEditing = () => null
}) => (
    <Container>
        <TextInput
            mode="outlined"
            disabled={disabled}
            label={placeholder}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
        />
    </Container>
);

TextInputPaper.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
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

export default TextInputPaper;