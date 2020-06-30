import React from "react";
import { View } from "react-native";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import ButtonPaper from "./ButtonPaper";
import ProgressApply from "./ProgressApply";
import { PROGRESS_APPLY } from "../SharedQueries";

const TextBox = styled.View`
    flex-direction: row;
    margin: 0 10px;
    margin-bottom: 25px;
    align-items: center;
`;

const ButtonBox = styled.View`
    margin-top: 20px;
    align-items: center;
`;

const Text = styled.Text`
    background-color: ${props => props.theme.lightGreyColor};
    width: 20%;
    font-size: 16px;
    padding: 10px;
`;

const UserText = styled.Text`
    background-color: #fff;
    width: 60%;
    font-size: 16px;
    padding: 10px;
`;

const ProgressCardUser = ({ 
    postId,
    userName,
    categorys,
    anotherPage,
    handleAction
}) => {
    const [progressApplyMutation] = useMutation(PROGRESS_APPLY);

    const handleProgressApply = async(postId, userName) => {
        handleAction("post", "");
        try {
            await progressApplyMutation({
                variables: {
                    postId,
                    userName
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    return(
        <View>
            <TextBox>
                <Text>신청자</Text>
                <UserText>{userName}</UserText>
            </TextBox>
            {categorys.map(category => (
                <ProgressApply 
                    key={category.id}
                    categoryId={category.id}
                    userName={userName}
                    anotherPage={anotherPage}
                />
            ))}
            <ButtonBox>
                <ButtonPaper 
                    onPress={() => handleProgressApply(postId, userName)}
                    text="전체 진행상황 완료"
                />
            </ButtonBox>
        </View>
    );
};

ProgressCardUser.propTypes = {
    postId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    categorys: PropTypes.array.isRequired,
    anotherPage: PropTypes.bool.isRequired,
    handleAction: PropTypes.func.isRequired,
};

export default ProgressCardUser;