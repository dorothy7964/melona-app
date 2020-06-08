import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    { ...emailInput }
                    placeholder="이메일"
                    keyboardType="email-address"
                    autoCorrect={false}
                />
                <AuthInput
                    { ...pwInput }
                    placeholder="비밀번호"
                    secureTextEntry={true}
                    keyboardType="default"
                />
                <AuthButton
                    onPress={() => null}
                    text="로그인"
                />
            </View>
        </TouchableWithoutFeedback>
    );
};