import React from "react";
// import { Image } from "react-native";
import styled from "styled-components";
import constants from "../constants";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Image = styled.Image`
    width: 200;
    height: 200;
`;

const Bold = styled.Text`
    color: ${props => props.theme.darkGreyColor};
    font-size: 17;
    font-weight: 600;
`;

export default () => (
    <View>
        <Image 
            resizeMode={"contain"}
            source={require('../assets/togeter_grey.png')}
        />
        <Bold>게시물을 추가 해주세요.</Bold>
    </View>
);


