import React, { useState } from "react";
import { Switch } from 'react-native-paper';
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../styles";
import AvatarPaper from "./AvatarPaper";
import ApplyContents from "./ApplyContents";
import { TOGGLECHECK_APPLY } from "../SharedQueries";

const Container = styled.View`
    flex-direction: column;
`;

const Profile = styled.View`
    flex-direction: row;
    align-items: center;
`;

const SwitchBox = styled.View`
    flex-direction: row;
    margin-left: 5px;
    align-items: center;
`;

const ApplyCheckBox = styled.View`
    margin-top: 10px;
`;

const Bold = styled.Text`
    display: flex;
    flex: 1;
    margin-left: 10px;
    font-size: 15px;
    font-weight: 600;
`;

const Text = styled.Text`
    margin-right: 5px;
    font-weight: 600;
`;

const ApplyUser = ({ 
    avatar,
    userName,
    applyId,
    applyReadCheck,
    postId,
    categorys,
    anotherPage,
}) => {
    // Switch
    const [checked, setChecked] = useState(applyReadCheck);
    const [toggleReadCheckMutation] = useMutation(TOGGLECHECK_APPLY);

    const handleToggleCheck = async(applyId) => {
        setChecked(!checked)
        try {
            await toggleReadCheckMutation({
                variables: { 
                    applyId
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <Profile>
                <AvatarPaper 
                    avatar={avatar}
                />
                <Bold>{userName}</Bold>
                <SwitchBox>
                    <Text>거절</Text>
                    <Switch
                        value={checked}
                        color={styles.melonaColor}
                        onValueChange={() => handleToggleCheck(applyId)}
                    />
                    <Text style={{ color: styles.melonaColor }}>수락</Text>
                </SwitchBox>
            </Profile>
            {checked && (
                <ApplyCheckBox>
                    {categorys.map(category => (
                        <ApplyContents 
                            key={category.id}
                            categoryId={category.id}
                            userName={userName}
                        />
                        
                    ))}
                </ApplyCheckBox>
            )}
        </Container>
    );
};

ApplyUser.propTypes = {
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    applyId: PropTypes.string.isRequired,
    applyReadCheck: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
    categorys: PropTypes.array.isRequired,
    anotherPage: PropTypes.bool.isRequired,
};

export default ApplyUser;