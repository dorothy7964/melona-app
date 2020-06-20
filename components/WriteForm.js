import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import ButtonPaper from "./ButtonPaper";
import TextInputPaper from "./TextInputPaper";
import { CONNECT_CONTNETS } from "../SharedQueries";

const Container = styled.View`
    padding: 10px 45px;
`;

const ContentContiner = styled.View`
    margin-top: 15px;
    align-items: center;
`;

const Bold = styled.Text`
    font-size: 15px;
    font-weight: 500;
`;

const WriteForm = ({
    categoryId,
    category,
}) => {
    const textInput = useInput();
    const [disabled, setDisabled] = useState(false);
    const [buttonView, setButtonView] = useState(true);
    const [coonnectContentsMutation] = useMutation(CONNECT_CONTNETS);

    const handleContent = async(categoryId , text) => {
        if (text === undefined) {
            setDisabled(false);
            setButtonView(true);
            return Alert.alert("작성 후 신청 해주세요.");
        }
        setDisabled(true);
        setButtonView(false);
        try {
            await coonnectContentsMutation({
                variables: {
                    text,
                    categoryId
                }   
            }); 
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <Bold>{`+ ${category}`}</Bold>
            <ContentContiner>
                <TextInputPaper 
                    { ...textInput }
                    disabled={disabled}
                    placeholder="작성 해주세요."
                    autoCorrect={false}
                    onSubmitEditing={() => null}
                />
                {buttonView
                    ?   <ButtonPaper
                            onPress={() => handleContent(categoryId, textInput.value )}
                            text="신청 하기"
                        />
                    :   <ButtonPaper
                            onPress={() => null}
                            disabled={disabled}
                            text="신청 완료"
                        />
                }
            </ContentContiner>
        </Container>
    );
};

WriteForm.propTypes = {
    categoryId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default WriteForm;