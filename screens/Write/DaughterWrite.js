import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Card } from "react-native-paper";
import moment from "moment";
import styled from "styled-components";
import ButtonPaper from "../../components/ButtonPaper";
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
    const [lastDate, setLastDate] = useState("");
    const [alertLocation, setAlertLocation] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    
    const handleConfirm = async() => {
        if (locationInput.value === "") {
            return setAlertLocation("지역을 작성 해주세요.");
        }

        try {
            if (lastDate === "") {
                const getDate = new Date(); 
                // today 
                const momentDate = moment(getDate).format("YYYY-MM-DDTHH:mm:ssZ");
                const momentDateSplit = momentDate.split("T");
                const today = momentDateSplit[0];
                console.log(today);
            } else {
                console.log("쿼리 연결")
            }
            setAlertLocation("");
        } catch(e) {
            console.log(e);
        }
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