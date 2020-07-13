import React from "react";
import { ActivityIndicator } from "react-native";
import { Button } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";

const View = styled.View`
    width: ${`${props => props.widthSize}`};
`;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    background-color: ${props => props.theme.melonaColor};
    width: ${`${props => props.widthSize}`};
    padding: 10px;
    border-radius: 4px;
`;

const ButtonPaper = ({ 
    props, 
    onPress, 
    text, 
    widthSize="constants.width / 1.7",
    color="#fff",
    mode="contained",
    loading=false,
    disabled=false,
    primaryColor=styles.melonaColor
}) => (
    <View widthSize={widthSize}>
        {loading
            ?   <Touchable disabled={loading}>
                    <Container widthSize={widthSize}>
                        <ActivityIndicator color="white" />
                    </Container>
                </Touchable>
            :   <Button 
                    mode={mode}
                    disabled={disabled}
                    onPress={onPress} 
                    labelStyle={{
                        color: `${color}`,
                        fontWeight: "600"
                    }}
                    theme={{ colors: { primary: `${primaryColor}` } }} {...props}
                >
                    {text}
                </Button>
        }
    </View>
);

ButtonPaper.propTypes = {
    mode: PropTypes.oneOf([
        "text",
        "outlined",
        "contained",
    ]),
    widthSize: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    primaryColor: PropTypes.string
};

export default ButtonPaper;