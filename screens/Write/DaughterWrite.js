import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components";
import ButtonPaper from "../../components/ButtonPaper";
import RadioBox from "../../componentsWrite/RadioBox";
import Location from "../../componentsWrite/Location";
import DatePicker from "../../componentsWrite/DatePicker";
import useInput from "../../hooks/useInput";

const Container = styled(Card)`
    margin: 10px;
    padding:30px;
`;

const AlignCenter = styled.View`
    margin: 15px 0;
    align-items: center;
`;

const Image = styled.Image`
    width: 100px;
    height: 100px;
`;

const Section = styled.View`
    margin: 20px 10px;
`;

const GreyBold = styled.Text`
    color: ${props => props.theme.darkGreyColor};
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: 600;
`;

const AlertText = styled.Text`
    color: ${props => props.theme.redColor};
    margin-top: 10px;
    font-size: 17px;
`;

export default () => {
    const locationInput = useInput("");
    const [categoryText, setCategoryText] = useState("food");
    const [lastDate, setLastDate] = useState("");
    const [alertLocation, setAlertLocation] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    
    const handleConfirm = async() => {
        console.log("categoryText",categoryText);
    };

    const refresh = () => {
        try {
            setRefreshing(true);
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    
    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
            <Container>
                <AlignCenter>
                    <Image 
                        resizeMode={"contain"}
                        source={require('../../assets/daughter-body.png')}
                    />
                </AlignCenter>
                <Section>
                    <GreyBold>도착일을 선택해 주세요.</GreyBold>
                    <DatePicker 
                        setLastDate={setLastDate}
                    />
                </Section>
                <Section>
                    <GreyBold>지역을 선택해 주세요.</GreyBold>
                    <Location 
                        locationInput={locationInput}
                    />
                    <AlertText>{alertLocation}</AlertText>
                </Section>
                <Section>
                    <GreyBold>카테고리를 체크 해주세요.</GreyBold>
                    <RadioBox
                        categoryText={categoryText}
                        setCategoryText={setCategoryText}
                    />
                </Section>
                <AlignCenter>
                    <ButtonPaper
                        onPress={handleConfirm}
                        text="작성 하기"
                        loading={false}
                    />
                </AlignCenter>
            </Container>
        </ScrollView>
    );
};