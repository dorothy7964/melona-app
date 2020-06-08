import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const emailInput = useInput("");
    const pwInput = useInput("");
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [confirmPasswordMutation ] = useMutation(LOG_IN, {
        variables: {
            email: emailInput.value,
            password: pwInput.value
        }
    });
    const handleLogin = async() => {
        const { value } = emailInput;
        if (value === ""){
            return Alert.alert("이메일을 작성해주세요.");
        } else if (!value.includes("@") || !value.includes(".")){
            return Alert.alert("이메일 형식이 아닙니다.");
        } else if (!emailRegex.test(value)){
            return Alert.alert("해당 이메일이 유효하지 않습니다");
        }
        
        try {
            setLoading(true);
            const {
                data: { confirmPassword }
            } = await  confirmPasswordMutation();
            if (confirmPassword !== "" || confirmPassword !== false) {
                logIn(confirmPassword);
            } else {
                Alert.alert("이메일과 비밀번호가 일치하지 않습니다.");
            }
        } catch (e){
            console.log(e);
            Alert.alert("이메일과 비밀번호가 일치하지 않습니다.");
        } finally{
            setLoading(false);
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
                    loading={loading}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};