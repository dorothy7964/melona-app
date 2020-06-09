import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import TextInputPaper from "../../components/TextInputPaper";
import useInput from "../../hooks/useInput";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Touchable = styled.TouchableOpacity``;

const Wrapper = styled.View``;

const Container = styled.View``;

const Text = styled.Text`
    color: ${props => props.theme.melonaColor};
    font-weight: 600;
    margin-top: 20px;
`;

export default ({ navigation }) => {
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const [forgetView, setForgetView] = useState(false);
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
                setForgetView(true);
                Alert.alert("이메일과 비밀번호가 일치하지 않습니다.");
            }
        } catch (e){
            console.log(e);
            setForgetView(true);
            Alert.alert("이메일과 비밀번호가 일치하지 않습니다.");
        } finally{
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <TextInputPaper 
                    { ...emailInput }
                    placeholder="이메일"
                    keyboardType="email-address"
                    autoCorrect={false}
                    onSubmitEditing={handleLogin}
                />
                <TextInputPaper 
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
                {forgetView === true && (
                    <Wrapper>
                        <Touchable onPress={() => navigation.navigate("Confirm")}>
                            <Container>
                                <Text>비밀번호 찾기</Text>
                            </Container>
                        </Touchable>
                        <Touchable onPress={() => navigation.navigate("Signup")}>
                            <Container>
                                <Text>회원가입 하기</Text>
                            </Container>
                        </Touchable>
                    </Wrapper>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};