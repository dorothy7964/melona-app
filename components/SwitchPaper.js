import React, { useState } from "react";
import { Text } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { Switch } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../styles";
import { TRUE_APPLY, TOGGLE_CONTENTREQ } from "../SharedQueries";

const Container = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 20px 10px;
    align-items: center;
`;

const TextBox = styled.View`
    display: flex;
    flex: 1;
`;

const SwitchPaper = ({
    postId,
    contentId,
    contentText,
}) => {
    const [isSwitch, setIsSwitch] = useState(false);
    const [trueApplyMutation] = useMutation(TRUE_APPLY);
    const [toggleContnetsReqMutation] = useMutation(TOGGLE_CONTENTREQ);

    const handleToggleSwitch = async(contentId, postId) => {
        setIsSwitch(!isSwitch);
        try {
            await toggleContnetsReqMutation({
                variables: {
                    contentId
                }   
            });
            await trueApplyMutation({
                variables: {
                    postId
                }   
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <TextBox>
                <Text>{contentText}</Text>
            </TextBox>
            <Switch
                value={isSwitch}
                color={styles.melonaColor}
                onValueChange={() => handleToggleSwitch(contentId, postId)}
            />
        </Container>
    );
};

SwitchPaper.propTypes = {
    postId: PropTypes.string.isRequired,
    contentId: PropTypes.string.isRequired,
    contentText: PropTypes.string.isRequired,
};

export default SwitchPaper;