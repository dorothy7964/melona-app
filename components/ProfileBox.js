import React from "react";
import { Alert } from "react-native";
import { Card } from "react-native-paper";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import AvatarPaper from "./AvatarPaper";
import ButtonPaper from "./ButtonPaper";
import TextInputPaper from "./TextInputPaper";
import { ME, EDIT_USER, EDIT_PASSWORD } from "../screens/Tabs/TabsQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 30px 20px;
    padding: 20px 15px;
    min-height: 580px;
`;

const UserBox = styled.View`
    flex-direction: column;
    margin-left: 10px;
`;

const Section = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 15px;
    margin-bottom: 40px;
`;

const SectionContainer = styled.View`
    margin: 0 auto;
`;

const SectionBox = styled.View`
    margin-top: 10px;
    margin-left: 15px;
`;

const ButtonBox = styled.View`
    margin-top: 30px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight:600;
`;

const GreyText = styled.Text`
    font-weight:600;
    color: ${props => props.theme.darkGreyColor};
`;

const RedText = styled.Text`
    font-weight:600;
    color: ${props => props.theme.redColor};
`;

export default ({ 
    avatarMe,
    userNameMe,
    emailMe,
    loadingBt,
    handleLogOut,
    toggleLoadingBt,
}) => {
    const [editPasswordMutation] = useMutation(EDIT_PASSWORD);
    const [editUserMutation] = useMutation(EDIT_USER, {
        refetchQueries: () => [{ query: ME }]
    });
    const userNameInput = useInput(`${userNameMe}`);
    const emailInput = useInput(`${emailMe}`);
    const passwordInput = useInput("");
    const confirmPwInput = useInput("");
    const { value: userName } = userNameInput;
    const { value: email } = emailInput;
    const { value: password } = passwordInput;
    const { value: passwordConfirm } = confirmPwInput;

    const handleConfirm = async(
        userName, 
        email, 
        password, 
        passwordConfirm,
    ) => {
        if (userName === "") {
            return Alert.alert("유저 이름이 비었습니다.");

        } else if (email === "") {
            return Alert.alert("이메일이 비었습니다.");
            
        } else if (password !== "" || passwordConfirm !== "" ) {
            toggleLoadingBt(true);
            if (password === passwordConfirm) {
                try {
                    await editPasswordMutation({
                        variables: { password }
                    });
                } catch (e) {
                    toggleLoadingBt(false);
                    return Alert.alert("비밀번호가 변경되지 않습니다.");
                } finally {
                    toggleLoadingBt(false);
                }
            } else {
                toggleLoadingBt(false);
                return Alert.alert("비밀번호가 일치하지 않습니다.");
            }
        }
    
        try {
            toggleLoadingBt(true);
            const {
                data: { editUser }
            } = await editUserMutation({
                variables: { userName, email }
            });
            if (!editUser){
                Alert.alert("프로필 편집 되지 않았습니다.");
            } else {
                Alert.alert("프로필이 편집 되었습니다.");
            }
        } catch (e) {
            if (
                e.message === "GraphQL error: A unique constraint would be violated on User. Details: Field name = userName"
            ) {
                Alert.alert("이미 존재하는 이름 입니다.");
            } else if (
                e.message === "GraphQL error: A unique constraint would be violated on User. Details: Field name = email"
            ) {
                Alert.alert("이미 존재하는 이메일 입니다.");
            } else {
                Alert.alert(e.message);
            }
            toggleLoadingBt(false);
        } finally {
            toggleLoadingBt(false);
            passwordInput.setValue("");
            confirmPwInput.setValue("");
        }
    };

    return (
        <Container>
            <Section>
                <AvatarPaper 
                    size={100}
                    avatar={avatarMe}
                />
                <UserBox>
                    <Title>{userNameMe}</Title>
                    <Touchable onPress={handleLogOut}>
                        <GreyText>로그아웃</GreyText>
                    </Touchable>
                </UserBox>
            </Section>
            <SectionContainer>
                <SectionBox>
                    <TextInputPaper
                        { ...userNameInput }
                        placeholder="유저 이름"
                    />
                </SectionBox>
                <SectionBox>
                    <TextInputPaper
                        { ...emailInput }
                        placeholder="유저 이메일"
                        keyboardType="email-address"
                        autoCorrect={false}
                    />
                </SectionBox>
                <SectionBox>
                    <TextInputPaper
                        { ...passwordInput }
                        placeholder="비밀번호"
                        secureTextEntry={true}
                    />
                </SectionBox>
                <SectionBox>
                    <TextInputPaper
                        { ...confirmPwInput }
                        placeholder="비밀번호 확인"
                        secureTextEntry={true}
                    />
                </SectionBox>
                { password !== "" && password !== passwordConfirm && (
                    <SectionContainer>
                        <RedText>비밀번호가 일치하지 않습니다.</RedText>
                    </SectionContainer>
                )}
                <ButtonBox>
                    <ButtonPaper
                        onPress={() => handleConfirm(
                            userName, 
                            email, 
                            password, 
                            passwordConfirm
                        )}
                        text="프로필 편집하기"
                        loading={loadingBt}
                    />
                </ButtonBox>
            </SectionContainer>
        </Container>
    );
};