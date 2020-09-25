import React, { useState } from "react";
import { Platform, Alert, View, Text, Image } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import styled from "styled-components";
import styles from "../styles";
import constants from "../constants";
import PropTypes from "prop-types";
import ButtonPaper from "./ButtonPaper";
import DialogPaperPhoto from "./DialogPaperPhoto";
import NavIcon from "./NavIcon";
import SelectPhoto from "./SelectPhoto";
import { PROGRESS_NUM, EDIT_CONFIRMFILE } from "../SharedQueries";

const melonaColor = styles.melonaColor;
        
const mainColor = {
    color: melonaColor
};
        
const greyColor = {
    color: styles.darkGreyColor
};

const Touchable = styled.TouchableOpacity``;

const ViewSelect = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
`;

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

const ProgressSteppers = ({ 
    stepNum,
    contentId,
    anotherPage,
    categoryText,
    contentText,
    confirmFile,
}) => {
    const [viewPhoto, setViewPhoto] = useState(false);
    const [removeBtn, setRemoveBtn] = useState(false);
    const [stepNumber, setStepNumber] = useState(stepNum);
    const [onSubmitText, setOnSubmitText] = useState("진행이 완료 되었습니까?");
    const [progressNumMutation] = useMutation(PROGRESS_NUM);
    const [editConfirmFileMutation] = useMutation(EDIT_CONFIRMFILE);

    const onNext = async() => {
        setStepNumber(stepNumber + 1);
        try {
            await progressNumMutation({
                variables: { 
                    contentId,
                    anotherPage,
                    stepNum: stepNumber + 1
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onPrevious = async() => {
        setStepNumber(stepNumber - 1);
        try {
            await progressNumMutation({
                variables: { 
                    contentId,
                    anotherPage,
                    stepNum: stepNumber - 1
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onSubmit = () => {
        onNext();
        setRemoveBtn(true);
        setOnSubmitText("진행이 완료 되었습니다.");
    };

    // DialogPaperPhoto
    const [visible, setVisible] = useState(false);

    const handleToggleDialog = () => {
        setVisible(!visible);
    };

    // Uploade
    const handleViewPhoto = () => {
        setViewPhoto(!viewPhoto);
    };

    const handleUpload = async(contentId, anotherPage, photo) => {
        console.log("보류 - 아마존 연결하기")
        // try {
        //     const {
        //         data: { editConfirmFile }
        //     } = await editConfirmFileMutation({
        //         variables: {
        //             contentId,
        //             anotherPage,
        //             confirmFile: photo
        //         }
        //     });
        //     if (editConfirmFile){
        //         Alert.alert("업로드 되었습니다.")
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
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
                    <ProgressStep label="진행 중" />
                    <ProgressStep label="인증 사진" />
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
                        nextBtnText="다음"
                        previousBtnText="이전"
                        finishBtnText="완료"
                        nextBtnTextStyle={mainColor} 
                        previousBtnTextStyle={greyColor}
                        onNext={onNext}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Text>진행이 되었으면 다음으로 넘어가주세요.</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep 
                        label="인증 사진"
                        nextBtnText="다음"
                        previousBtnText="이전"
                        finishBtnText="완료"
                        nextBtnTextStyle={mainColor} 
                        previousBtnTextStyle={greyColor}
                        onNext={onNext}
                        onPrevious={onPrevious}
                    >
                        <View>
                            {confirmFile === null || confirmFile !== "" &&
                            <ViewSelect>
                                <Image
                                    source={{ uri: confirmFile }}
                                    style={{ 
                                        width: constants.width / 4,
                                        height: constants.height / 6,
                                    }}
                                />
                            </ViewSelect>
                            }
                            <ViewSelect>
                                <Text style={{ marginRight: 10 }}>
                                    인증 사진을 올리겠습니까?
                                </Text>
                                <Touchable onPress={handleViewPhoto}>
                                    <NavIcon
                                        size={20}
                                        focused={false}
                                        name={Platform.OS === "ios" 
                                            ? "ios-photos" 
                                            : "md-photos"
                                        }
                                    />
                                </Touchable>
                            </ViewSelect>
                        </View>
                        {viewPhoto && 
                            <SelectPhoto 
                                contentId={contentId}
                                anotherPage={anotherPage}
                                confirmFile={confirmFile}
                                handleUpload={handleUpload}
                            />
                        }
                    </ProgressStep>
                    <ProgressStep 
                        label="완료"
                        nextBtnText="다음"
                        previousBtnText="이전"
                        finishBtnText="완료"
                        nextBtnTextStyle={mainColor} 
                        previousBtnTextStyle={greyColor}
                        onSubmit={onSubmit}
                        onPrevious={() => onPrevious("last")}
                        removeBtnRow={removeBtn}
                    >
                        <View style={{ alignItems: 'center' }}>
                            {removeBtn
                                ?   <LastText>{onSubmitText}</LastText>
                                :   <Text>{onSubmitText}</Text>
                            }
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </Container>
        );
    }
};

ProgressSteppers.propTypes = {
    stepNum: PropTypes.number.isRequired,
    contentId: PropTypes.string.isRequired,
    anotherPage: PropTypes.bool.isRequired,
    categoryText: PropTypes.string,
    contentText: PropTypes.string,
    confirmFile: PropTypes.string,
};

export default ProgressSteppers;