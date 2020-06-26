import React, { useState } from "react";
import { Text } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { Switch } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../styles";
import { 
    TRUE_APPLY, 
    TOGGLE_CONTENTREQ,
    TOGGLECHECKCONFIRM_CONTENTS
} from "../SharedQueries";

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
    type,
    postId,
    contentId,
    contentText,
    contentCheck
}) => {
    // WriteFormMe
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

    // ApplyContents
    const [isContentSwitch, setIsContentSwitch] = useState(contentCheck);
    const [checkContentsMutation] = useMutation(TOGGLECHECKCONFIRM_CONTENTS);

    const handleToggleContentSwitch = async(contentId) => {
        setIsContentSwitch(!isContentSwitch);
        try {
            await checkContentsMutation({
                variables: {
                    contentId
                }   
            });
        } catch (e) {
            console.log(e);
        }
    };

    if (type === "WriteFormMe") {
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
    } else if (type === "ApplyContents") {
        return (
            <Container>
                <TextBox>
                    <Text>{contentText}</Text>
                </TextBox>
                <Switch
                    value={isContentSwitch}
                    color={styles.melonaColor}
                    onValueChange={() => handleToggleContentSwitch(contentId)}
                />
            </Container>
        );
    }
};

SwitchPaper.propTypes = {
    type: PropTypes.string.isRequired,
    contentId: PropTypes.string.isRequired,
    contentText: PropTypes.string.isRequired,
    postId: PropTypes.string,
    contentCheck: PropTypes.bool,
};

export default SwitchPaper;