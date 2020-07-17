import React, { useState } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { Card } from "react-native-paper";
import { useQuery, useMutation } from "react-apollo-hooks";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import ButtonPaper from "../../components/ButtonPaper";
import RadioBox from "../../componentsWrite/RadioBox";
import WriteInput from "../../componentsWrite/WriteInput";
import DatePicker from "../../componentsWrite/DatePicker";
import useInput from "../../hooks/useInput";
import { categoryObj } from "../../hooks/Category";
import { SEE_BUYME } from "../Tabs/TabsQueries";
import { 
    CREATE_BUYME, 
    CREATE_CONTENTS, 
    CONNECT_CONTENTS 
} from "./WriteQueries";


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
    margin: 0 auto;
    margin-top: 10px;
    font-size: 17px;
`;

const AlignCenterButton = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export default () => {
    const navigation = useNavigation();
    const locationInput = useInput("");
    const categoryContentInput = useInput("");
    const [view, setview] = useState("default");
    const [postId, setPostId] = useState("");           // categoryText
    const [categoryIdState] = useState(categoryObj);    // categoryText
    const [categoryText, setCategoryText] = useState("food");
    const [lastDate, setLastDate] = useState("");
    const [alertLocation, setAlertLocation] = useState("");
    const [alertCategoryText, setAlertCategoryText] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { refetch } = useQuery(SEE_BUYME);
    const [createBuyMeMutation] = useMutation(CREATE_BUYME);
    const [createContentsMutation] = useMutation(CREATE_CONTENTS);
    const [coonnectContentsMutation] = useMutation(CONNECT_CONTENTS);
    
    const createBuyMe = async() => {
        if (locationInput.value === ""){
            setAlertCategoryText("");
            return setAlertLocation("지역을 작성 해주세요.");
        } 
        if (categoryContentInput.value === "") {
            setAlertLocation("");
            return setAlertCategoryText("카테고리 내용을 작성해주세요.");
        } 
        // Mutation
        try {
            const {
                data: {
                    createBuyMe: {
                        category
                    }
                }
            } = await createBuyMeMutation({
                variables: {
                    location: locationInput.value,
                    lastDate,
                    categoryText,
                    contentText: categoryContentInput.value
                }   
            });
            setPostId(category.post.id);
            categoryIdState[categoryText] = category.id;
        } catch(e) {
            console.log(e);
        }
    };

    const handleConfirm = () => {
        if (locationInput.value === ""){
            setAlertCategoryText("");
            return setAlertLocation("지역을 작성 해주세요.");
        } 
        if (categoryContentInput.value === "") {
            setAlertLocation("");
            return setAlertCategoryText("카테고리 내용을 작성해주세요.");
        } 
        createBuyMe();
        setAlertLocation("");
        setAlertCategoryText("");
        Alert.alert("완료 되었습니다."); 
        refetch();
        navigation.navigate("TabNavigation", { screen: "Daughter" });
    };

    const handleAddContent = () => {
        if (locationInput.value === ""){
            setAlertCategoryText("");
            return setAlertLocation("지역을 작성 해주세요.");
        } 
        if (categoryContentInput.value === "") {
            setAlertLocation("");
            return setAlertCategoryText("카테고리 내용을 작성해주세요.");
        }
        createBuyMe();
        categoryContentInput.setValue("");
        setview("add");
    };


    const addContent = async() => {
        if (categoryContentInput.value === "") {
            return setAlertCategoryText("카테고리 내용을 작성해주세요.");
        } 
        if (categoryIdState[categoryText] === "") {
            const { 
                data: {
                    createContents: {
                        category
                    }
                }
            } = await createContentsMutation({
                variables: {
                    postId,
                    categoryText,
                    contentText: categoryContentInput.value
                }
            });
            categoryIdState[categoryText] = category.id
            categoryContentInput.setValue("");
        } else {
            await coonnectContentsMutation({
                variables: {
                    text: categoryContentInput.value,
                    categoryId: categoryIdState[categoryText]
                }
            });
            categoryContentInput.setValue("");
        }
    };

    const handlePlusContent = () => {
        if (categoryContentInput.value === "") {
            return setAlertCategoryText("카테고리 내용을 작성해주세요.");
        }
        addContent();
        return Alert.alert("더 작성 해주세요.");
    };

    const handleAddConfirm = () => {
        if (categoryContentInput.value === "") {
            return setAlertCategoryText("카테고리 내용을 작성해주세요.");
        }
        addContent();
        refetch();
        Alert.alert("작성이 완료 되었습니다.");
        navigation.navigate("TabNavigation", { screen: "Daughter" });
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
                {view === "default" &&
                <Section>
                    <GreyBold>도착일을 선택해 주세요.</GreyBold>
                    <DatePicker 
                        setLastDate={setLastDate}
                    />
                    <AlertText />
                    </Section>}
                {view === "default" &&
                <Section>
                    <GreyBold>지역을 선택해 주세요.</GreyBold>
                    <WriteInput 
                        inputValue={locationInput}
                    />
                    <AlertText>{alertLocation}</AlertText>
                </Section>}
                <Section>
                    <GreyBold>카테고리를 체크 해주세요.</GreyBold>
                    <RadioBox
                        categoryText={categoryText}
                        setCategoryText={setCategoryText}
                    />
                    <AlertText />
                </Section>
                <Section>
                    <GreyBold>선택한 카테고리의 내용을 적어주세요.</GreyBold>
                    <WriteInput 
                        inputValue={categoryContentInput}
                    />
                    <AlertText>{alertCategoryText}</AlertText>
                </Section>
                <AlignCenterButton>  
                    <ButtonPaper
                        onPress={view === "default"
                            ? handleAddContent
                            : handlePlusContent
                        }
                        text="더쓰기"
                        loading={false}
                    />
                    <ButtonPaper
                            onPress={view === "default"
                            ? handleConfirm
                            : handleAddConfirm
                        }
                        text="작성 하기"
                        loading={false}
                    />
                </AlignCenterButton>
            </Container>
        </ScrollView>
    );
};