import React from "react";
import styled from "styled-components";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Image = styled.Image`
    width: 200px;
    height: 200px;
`;

const Bold = styled.Text`
    color: ${props => props.theme.darkGreyColor};
    font-size: 17px;
    font-weight: 600;
    margin-top: -40px;
`;

export default () => (
    <View>
        <Image 
            resizeMode={"contain"}
            source={require('../assets/togeter_grey.png')}
        />
        <Bold>게시물이 존재하지 않습니다.</Bold>
    </View>
);


