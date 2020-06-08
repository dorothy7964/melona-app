import React from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const emailInput = useInput("");
    const pwInput = useInput("");
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleLogin = () => {
        const { value } = emailInput;
        if (value === ""){
            return Alert.alert("이메일을 작성해주세요.");
        } else if (!value.includes("@") || !value.includes(".")){
            return Alert.alert("이메일 형식이 아닙니다.");
        } else if (!emailRegex.test(value)){
            return Alert.alert("해당 이메일이 유효하지 않습니다");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    { ...emailInput }
                    placeholder="이메일"
                    keyboardType="email-address"
                    autoCorrect={false}
                    onSubmitEditing={handleLogin}
                />
                <AuthInput
                    { ...pwInput }
                    placeholder="비밀번호"
                    secureTextEntry={true}
                    keyboardType="default"
                />
                <AuthButton
                    onPress={handleLogin}
                    text="로그인"
                />
            </View>
        </TouchableWithoutFeedback>
    );
};