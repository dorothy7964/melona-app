import React, { useState } from "react";
import { View } from "react-native";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import styled from "styled-components";
import styles from "../styles";
import PropTypes from "prop-types";
import ButtonPaper from "./ButtonPaper";
import DialogPaperPhoto from "./DialogPaperPhoto";

const melonaColor = styles.melonaColor;

const Container = styled.View`
    margin-top: 20px;
`;

const LastText = styled.Text`
    color: ${props => props.theme.melonaColor};
    font-weight: 500;
    padding-bottom: 30px;
`;

const ButtonBox = styled.View`
    margin-top: 20px;
    align-items: center;
`;

const ProgressView = ({ 
    stepNum,
    categoryText,
    contentText,
    confirmFile
}) => {
    // DialogPaperPhoto
    const [visible, setVisible] = useState(false);

    const handleToggleDialog = () => {
        setVisible(!visible);
    };

    if (stepNum === 3) {
        return (
            <Container>
                <ProgressSteps
                    activeStep={2}
                    activeLabelColor={melonaColor}
                    completedStepIconColor={melonaColor}
                    completedProgressBarColor={melonaColor}
                    activeStepIconBorderColor={melonaColor}
                >
                    <ProgressStep 
                        label="진행 중"
                        removeBtnRow={true}
                    />
                    <ProgressStep 
                        label="인중사진"
                        removeBtnRow={true}
                    />
                    <ProgressStep 
                        label="완료"
                        removeBtnRow={true}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <LastText>진행이 완료 되었습니다.</LastText>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
                <ButtonBox>
                    <ButtonPaper 
                        onPress={handleToggleDialog}
                        text="인증 사진 보기"
                    />
                    <DialogPaperPhoto 
                        categoryText={categoryText}
                        contentText={contentText}
                        confirmFile={confirmFile}
                        visible={visible}
                        handleToggleDialog={handleToggleDialog}
                    />
                </ButtonBox>
            </Container>
        );
    } else {
        return (
            <Container>
                <ProgressSteps
                    activeStep={stepNum}
                    activeLabelColor={melonaColor}
                    completedStepIconColor={melonaColor}
                    completedProgressBarColor={melonaColor}
                    activeStepIconBorderColor={melonaColor}
                >
                    <ProgressStep 
                        label="진행 중"
                        removeBtnRow={true}
                    />
                    <ProgressStep 
                        label="인중사진"
                        removeBtnRow={true}
                    />
                    <ProgressStep 
                        label="완료"
                        removeBtnRow={true}
                    />
                </ProgressSteps>
            </Container>
        );
    }
};

ProgressView.propTypes = {
    stepNum: PropTypes.number.isRequired,
    categoryText: PropTypes.string,
    contentText: PropTypes.string,
    confirmFile: PropTypes.string,
};

export default ProgressView;