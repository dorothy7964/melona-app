import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components";
import { useMutation } from "react-apollo-hooks";
import { REQUEST_SECRET } from "./AuthQueries";
import ButtonPaper from "../../components/ButtonPaper";
import TextInputPaper from "../../components/TextInputPaper";
import useInput from "../../hooks/useInput";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const emailInput = useInput(route.params.email);
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [requestSecretMutation] = useMutation(REQUEST_SECRET, {
        variables: {
            email: emailInput.value
        }
    });

    const handleSubmit = async () => {
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
                data: { requestSecret }
            } = await  requestSecretMutation();
            if (requestSecret) {
                Alert.alert("받은 편지함에 임시 비밀번호를 확인하십시오");
                navigation.navigate("Login", { email: value });
            }
        } catch (e) {
            console.log(e);
            Alert.alert("아직 계정이 없습니다. 계정을 만드십시오.");
            navigation.navigate("Signup");
        } finally{
            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <TextInputPaper 
                    { ...emailInput }
                    placeholder="이메일"
                    keyboardType="email-address"
                    autoCorrect={false}
                    onSubmitEditing={handleSubmit}
                />
                <ButtonPaper
                    onPress={handleSubmit}
                    text="임시 비밀번호 받기"
                    loading={loading}
                />
            </View>
        </TouchableWithoutFeedback>
    )
};