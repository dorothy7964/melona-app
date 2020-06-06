import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => (
    <View>
        <AuthButton
            onPress={() => null}
            text="로그인"
        />
    </View>
);