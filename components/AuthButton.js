import React from "react";
import { ActivityIndicator } from "react-native";
import { Button } from 'react-native-material-ui';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const View = styled.View`
    width: ${constants.width / 1.7}
`;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    background-color: ${props => props.theme.melonaColor};
    width: ${constants.width / 1.7};
    padding: 10px;
    border-radius: 4px;
`;

const uiTheme = {
    palette: {
        primaryColor: "#b9dd39",
    }
};

const AuthButton = ({ onPress, text, loading = false }) => (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View>
            {loading
                ?   <Touchable disabled={loading}>
                        <Container>
                            <ActivityIndicator color="white" />
                        </Container>
                    </Touchable>
                :   <Button 
                        raised
                        primary 
                        text={text} 
                        onPress={onPress} 
                        style={{ text: { 
                            fontWeight: "600"
                        }}} 
                    /> 
            }
        </View>
    </ThemeContext.Provider>
);

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default AuthButton;