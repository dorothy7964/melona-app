import React, { useState } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { Card } from "react-native-paper";
import { useQuery, useMutation } from "react-apollo-hooks";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import styled from "styled-components";
import ButtonPaper from "../../components/ButtonPaper";
import CheckBox from "../../componentsWrite/CheckBox";
import Location from "../../componentsWrite/Location";
import DatePicker from "../../componentsWrite/DatePicker";
import { categoryArray } from "../../hooks/Category";
import useInput from "../../hooks/useInput";
import { SEE_BUY } from "../Tabs/TabsQueries";
import { CREATE_BUY } from "./WriteQueries";

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
    const navigation = useNavigation();
    const [categoryText] = useState([]);
    const locationInput = useInput("");
    const [lastDate, setLastDate] = useState("");
    const [alertCheck, setAlertCheck] = useState("");
    const [alertLocation, setAlertLocation] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { refetch } = useQuery(SEE_BUY);
    const [createBuyMutation] = useMutation(CREATE_BUY);
    
    const handleConfirm = async() => {
        if (categoryText.length === 0) {
            return setAlertCheck("카테고리를 체크 해주세요.");

        } else if(locationInput.value === "") {
            return setAlertLocation("지역을 작성 해주세요.");

        }
        try {
            if (lastDate === "") {
                const getDate = new Date(); 
                // today 
                const momentDate = moment(getDate).format("YYYY-MM-DDTHH:mm:ssZ");
                const momentDateSplit = momentDate.split("T");
                const today = momentDateSplit[0];
                await createBuyMutation({
                    variables: {
                        location: locationInput.value,
                        lastDate: today,
                        categoryText
                    }   
                }); 
            } else {
                await createBuyMutation({
                    variables: {
                        location: locationInput.value,
                        lastDate,
                        categoryText
                    }   
                }); 
            }
            refetch();
            setAlertCheck("");
            setAlertLocation("");
            navigation.navigate("TabNavigation", { screen: "Daddy" });
            return Alert.alert("완료 되었습니다."); 
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
                    <AlertText>{alertCheck}</AlertText>
                </Section>
                <Section>
                    <GreyBold>지역을 선택해 주세요.</GreyBold>
                    <Location 
                        locationInput={locationInput}
                    />
                    <AlertText>{alertLocation}</AlertText>
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