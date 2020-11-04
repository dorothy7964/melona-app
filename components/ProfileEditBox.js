import React from "react";
import { Card } from "react-native-paper";
import styled from "styled-components";
import AvatarPaper from "./AvatarPaper";

const Container = styled(Card)`
    margin: 30px 20px;
    padding: 20px 15px;
    min-height: 580px;
`;

const Section = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 15px;
    margin-bottom: 40px;
`;

const TitleMargin = styled.Text`
    font-size: 20px;
    font-weight:600;
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-size: 20px;
    font-weight:600;
    color: ${props => props.theme.darkGreyColor};
    margin: 0 auto;
`;

const ImageBox = styled.View`
    margin: 0 auto;
`;

const Image = styled.Image`
    width: 200px;
    height: 200px;
`;

export default ({ avatarMe, emailMe }) => (
    <Container>
        <Section>
            <AvatarPaper 
                size={100}
                avatar={avatarMe}
            />
            <TitleMargin>{emailMe}</TitleMargin>
        </Section>
        <ImageBox>
            <Image 
                resizeMode={"contain"}
                source={require('../assets/togeter_grey.png')}
            />
            <Bold>수정 중 ...</Bold>
        </ImageBox>
    </Container>
);