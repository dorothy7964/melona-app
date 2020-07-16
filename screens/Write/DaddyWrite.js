import React, { useState } from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components";
import ButtonPaper from "../../components/ButtonPaper";
import CheckBox from "../../componentsWrite/CheckBox";
import Location from "../../componentsWrite/Location";
import DatePicker from "../../componentsWrite/DatePicker";
import { categoryArray } from "../../hooks/Category";
import useInput from "../../hooks/useInput";

const Container = styled(Card)`
    margin: 10px;
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

export default () => {
    const [categoryText] = useState([]);
    const locationInput = useInput("");
    const [lastDate, setLastDate] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    
    const handleConfirm = () => {
        console.log(categoryText);
        console.log(locationInput.value);
        console.log(lastDate);
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
                        source={require('../../assets/daddy-body.png')}
                    />
                </AlignCenter>
                <Section>
                    <GreyBold>가능한 카테고리를 체크 해주세요.</GreyBold>
                    {categoryArray.map(category => (
                        <CheckBox
                            key={category}
                            category={category}
                            categoryText={categoryText}
                        />
                    ))}
                </Section>
                <Section>
                    <GreyBold>지역을 선택해 주세요.</GreyBold>
                    <Location 
                        locationInput={locationInput}
                    />
                </Section>
                <Section>
                    <GreyBold>도착일을 선택해 주세요.</GreyBold>
                    <DatePicker 
                        setLastDate={setLastDate}
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