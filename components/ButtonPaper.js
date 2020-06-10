import React from "react";
import { ActivityIndicator } from "react-native";
import { Button } from 'react-native-paper';
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

const ButtonPaper = ({ onPress, text, loading = false }) => (
    <View>
        {loading
            ?   <Touchable disabled={loading}>
                    <Container>
                        <ActivityIndicator color="white" />
                    </Container>
                </Touchable>
            :   <Button 
                    primary 
                    mode="contained"
                    onPress={onPress} 
                    labelStyle={{
                        color: "#fff",
                        fontWeight: "600"
                    }}
                >
                    {text}
                </Button>
        }
    </View>
);

ButtonPaper.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default ButtonPaper;