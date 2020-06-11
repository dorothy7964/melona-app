import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Facebook from "expo-facebook";
import styled from "styled-components";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import ButtonPaper from "../../components/ButtonPaper";
import TextInputPaper from "../../components/TextInputPaper";
import useInput from "../../hooks/useInput";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const InputContainer = styled.View`
    margin-bottom: 10px;
`;

const FBContainer = styled.View`
    margin-top: 25px;
    padding-top: 25px;
    border-top-width: 1px;
    border-color: ${props => props.theme.lightGreyColor};
    border-style: solid;
`;

export default ({ navigation }) => {
    const userNameInput = useInput("");
    const emailInput = useInput("");
    const passwordInput = useInput("");
    const confirmPwInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: { 
            userName: userNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }
    });
  
    const handleSignup = async () => {
        const { value: userName } = userNameInput;
        const { value: email } = emailInput;
        const { value: password } = passwordInput;
        const { value: confirmPw } = confirmPwInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
        if (!emailRegex.test(email)) {
            return Alert.alert("해당 이메일이 유효하지 않습니다");
        }
        if (userName === "") {
            return Alert.alert("유저이름을 작성해 주세요.");
        }
        if (email === "") {
            return Alert.alert("이메일을 작성해 주세요.");
        }
        if (password === "") {
            return Alert.alert("비밀번호를 작성해 주세요.");
        }
        if (confirmPw === "") {
            return Alert.alert("비밀번호 확인을 작성해 주세요.");
        }
        if (password !== confirmPw) {
            return Alert.alert("비밀번호가 일치하지 않습니다.");
        }
        
        try {
            setLoading(true);
            const {
                data: { createAccount }
            } = await createAccountMutation();
            if (createAccount) {
                Alert.alert("회원 가입이 되었습니다.");
                navigation.navigate("LoginAttach", { email: value });
            }
        } catch (e) {
            if (e.message === "GraphQL error: 이미 있는 이름 입니다.") {
               return Alert.alert("이미 존재하는 이름 입니다.");
            } else if (e.message === "GraphQL error: 이미 있는 이메일 입니다.") {
               return Alert.alert("이미 존재하는 이메일 입니다.");
            } else {
                return Alert.alert("다시 작성해 주세요.");
            }
        } finally {
            setLoading(false);
        }
    };

    // facebook connect
    const fbLogin = async () => {
        try {
            setLoading(true);
            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                "2377660639193111", 
                {
                    permissions: ['public_profile', 'email'],
                 }
            );
            if (type === 'success') {
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`
                );
                const { email } = await response.json();
                emailInput.setValue(email);
                const [userName] = email.split("@");
                userNameInput.setValue(userName);
                setLoading(false);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <InputContainer>
                    <TextInputPaper
                        { ...userNameInput }
                        placeholder="유저 이름"
                    />
                    <TextInputPaper
                        { ...emailInput }
                        placeholder="이메일"
                        keyboardType="email-address"
                        autoCorrect={false}
                        onSubmitEditing={handleSignup}
                    />
                    <TextInputPaper
                        { ...passwordInput }
                        placeholder="비밀번호"
                        secureTextEntry={true}
                    />
                    <TextInputPaper
                        { ...confirmPwInput }
                        placeholder="비밀번호 확인"
                        secureTextEntry={true}
                    />
                </InputContainer>
                <ButtonPaper
                    onPress={handleSignup}
                    text="회원 가입하기"
                    loading={loading}
                />
                <FBContainer>
                    <ButtonPaper
                        onPress={fbLogin}
                        text="페이스북으로 연결"
                        loading={false}
                        primaryColor="#2D4DA7"
                    />
                </FBContainer>
            </View>
        </TouchableWithoutFeedback>
    );
};
