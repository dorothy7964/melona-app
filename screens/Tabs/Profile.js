import React, { useState } from "react";
import { Alert } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import AvatarPaper from "../../components/AvatarPaper";
import ButtonPaper from "../../components/ButtonPaper";
import TextInputPaper from "../../components/TextInputPaper";
import useInput from "../../hooks/useInput";
import { ME, EDIT_USER, EDIT_PASSWORD } from "./TabsQueries";

const Container = styled(Card)`
    margin: 30px 20px;
    padding: 20px 15px;
    min-height: 580px;
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
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-size: 20px;
    font-weight:600;
    color: ${props => props.theme.darkGreyColor};
    margin: 0 auto;
`;

const ImageBox = styled.View`
    margin: 0 auto;
`;

const Image = styled.Image`
    width: 200px;
    height: 200px;
`;

export default () => {
    const { data, loading, refetch } = useQuery(ME);
    const [loadingBt, setLodaingBt] = useState(false);
    const [editPasswordMutation] = useMutation(EDIT_PASSWORD);
     const [editUserMutation] = useMutation(EDIT_USER, {
        refetchQueries: () => [{
            query: ME,
        }]
     });
    
    if (loading === true) {
        return  <Loader />;

    } else if (!loading && data && data.me) {
        const { me } = data;
        const userNameInput = useInput(`${me.userName}`);
        const emailInput = useInput(`${me.email}`);
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
            passwordConfirm
        ) => {
            if (userName === "") {
                return Alert.alert("유저 이름이 비었습니다.");
            } else if (email === "") {
                return Alert.alert("이메일이 비었습니다.");
            } else if (password !== "" || passwordConfirm !== "" ) {
                setLodaingBt(true);
                if (password === passwordConfirm) {
                    try {
                        await editPasswordMutation({
                            variables: { password }
                        });
                    } catch (e) {
                        setLodaingBt(false);
                        return Alert.alert("비밀번호가 변경되지 않습니다.");
                    } finally {
                        setLodaingBt(false);
                    }
                } else {
                    setLodaingBt(false);
                    return Alert.alert("비밀번호가 일치하지 않습니다.");
                }
            }
        
            try {
                setLodaingBt(true);
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
                setLodaingBt(false);
            } finally {
                setLodaingBt(false);
                passwordInput.setValue("");
                confirmPwInput.setValue("");
            }
            
        };

        if (loadingBt === true) {
            return (
                <Container>
                    <Section>
                        <AvatarPaper 
                            size={100}
                            avatar={me.avatar}
                        />
                        <Title>{me.userName}</Title>
                    </Section>
                    <ImageBox>
                        <Image 
                            resizeMode={"contain"}
                            source={require('../../assets/togeter_grey.png')}
                        />
                        <Bold>수정 중 ...</Bold>
                    </ImageBox>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Section>
                        <AvatarPaper 
                            size={100}
                            avatar={me.avatar}
                        />
                        <Title>{me.userName}</Title>
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
        }
    }
};