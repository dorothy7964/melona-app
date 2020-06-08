import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "@am-hooks/use-input";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const emailInput = useInput("");

    return (
        <View>
            <AuthInput
                placeholder="Email"
                value=""
                keyboardType="email-address"
            />
            <AuthButton
                onPress={() => null}
                text="로그인"
            />
        </View>
    );
};