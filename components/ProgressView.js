import React from "react";
import { View } from "react-native";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import styled from "styled-components";
import styles from "../styles";
import PropTypes from "prop-types";

const melonaColor = styles.melonaColor;

const Container = styled.View`
    margin-top: 20px;
`;

const LastText = styled.Text`
    color: ${props => props.theme.melonaColor};
    font-weight: 500;
    padding-bottom: 30px;
`;

const ProgressView = ({ 
    stepNum,
}) => {
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
};

export default ProgressView;