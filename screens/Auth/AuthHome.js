import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import ButtonPaper from "../../components/ButtonPaper";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Image = styled.Image`
    width: ${constants.width / 2.5}px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
    color: ${props => props.theme.melonaColor};
    font-weight: 600;
    margin-top: 20px;
`;

export default ({ navigation }) => (
    <View>
        <Image 
            resizeMode={"contain"}
            source={require("../../assets/logo.png")} 
        />
        <ButtonPaper 
            onPress={() => navigation.navigate("Signup")}
            text="회원 가입"
        />
        <Touchable onPress={() => navigation.navigate("Login", { email: "" })}>
            <LoginLink>
                <LoginLinkText>로그인</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);