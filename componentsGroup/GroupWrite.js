import React from "react";
import { Platform, View } from "react-native";
import styled from "styled-components";
import GroupAddMember from "./GroupAddMember";
import ButtonPaper from "../components/ButtonPaper";
import NavIcon from "../components/NavIcon";
import TextInputPaper from "../components/TextInputPaper";

const Touchable = styled.TouchableOpacity``;

const GreyBold = styled.Text`
    color: ${props => props.theme.darkGreyColor};
    font-size: 17px;
    font-weight: 600;
`;

const Section = styled.View`
    margin: 20px 10px;
`;

const MemberUserBox = styled.View`
    margin: 20px 10px;
    margin-bottom: 50px;
`;

const MemberSection = styled.View`
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

const MemberButtonBox = styled.View`
    margin-left: 10px;
    flex-direction: row;
    align-items: center;
`;

const BoldMarginBoth = styled.Text`
    color: ${props => props.theme.melonaColor};
    margin: 0 10px;
    font-size: 17px;
    font-weight: 600;
    color: ${props => props.memberView 
        ? props.theme.darkGreyColor 
        : props.theme.melonaColor};
`;

export default ({
    loading,
    groupInput,
    memberView,
    userMember,
    handleToggleOpen,
    handleConfirm,
}) => {
    return (
        <View>
            <GreyBold>그룹 이름</GreyBold>
            <Section>
                <TextInputPaper 
                    { ...groupInput }
                    placeholder="그룹 이름을 작성해주세요."
                /> 
            </Section>
            <MemberUserBox>
                <MemberSection>
                    <GreyBold>그룹 인원 선택</GreyBold>
                    <Touchable onPress={handleToggleOpen}>
                        <MemberButtonBox>
                            <BoldMarginBoth memberView={memberView}>
                                인원 보기
                            </BoldMarginBoth>
                            <NavIcon
                                size={25}
                                focused={memberView ? false : true}
                                name={Platform.OS === "ios" 
                                    ? memberView 
                                        ?  "ios-arrow-dropup" 
                                        :  "ios-arrow-dropdown" 
                                    : memberView 
                                        ?  "md-arrow-dropup" 
                                        :  "md-arrow-dropdown" 
                                }
                            />
                        </MemberButtonBox>
                    </Touchable>
                </MemberSection>
                <GroupAddMember
                    memberView={memberView}
                    userMember={userMember}
                />
            </MemberUserBox>
            <ButtonPaper
                onPress={handleConfirm}
                text="작성 하기"
                loading={loading}
            />
        </View>
    );
};