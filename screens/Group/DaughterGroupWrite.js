import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform, Alert } from "react-native";
import { Card } from "react-native-paper";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import moment from "moment";
import "moment-timezone";
import NavIcon from "../../components/NavIcon";
import ButtonPaper from "../../components/ButtonPaper";
import RadioBox from "../../componentsWrite/RadioBox";
import WriteInput from "../../componentsWrite/WriteInput";
import DatePicker from "../../componentsWrite/DatePicker";
import useInput from "../../hooks/useInput";
import { categoryObj } from "../../hooks/Category";
import { 
    SEEBUYME_GROUP,
    CREATE_BUYME_GROUP, 
    CREATE_CONTENTS, 
    CONNECT_CONTENTS,
    items
} from "./GroupQueries";

const Touchable = styled.TouchableOpacity``;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 10px;
`;

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

export default ({ navigation, route: { params: { groupRoomId } }}) => {
    // today
    const momentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ssZ");
    const momentDateSplit = momentDate.split("T");
    const today = momentDateSplit[0];

    const locationInput = useInput("");
    const categoryContentInput = useInput("");
    const [view, setview] = useState("default");
    const [postId, setPostId] = useState("");           // categoryText
    const [categoryIdState] = useState(categoryObj);    // categoryText
    const [categoryText, setCategoryText] = useState("food");
    const [lastDate, setLastDate] = useState(today);
    const [alertLocation, setAlertLocation] = useState("");
    const [alertCategoryText, setAlertCategoryText] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [createBuyMeGroupMutation] = useMutation(CREATE_BUYME_GROUP, {
        refetchQueries: () => [{
            query: SEEBUYME_GROUP,
            variables: { 
                groupRoomId,
                pageNumber: 0,
                items
            }
        }]
    });
    const [createContentsMutation] = useMutation(CREATE_CONTENTS, {
        refetchQueries: () => [{
            query: SEEBUYME_GROUP,
            variables: { 
                groupRoomId,
                pageNumber: 0,
                items
            }
        }]
    });
    const [coonnectContentsMutation] = useMutation(CONNECT_CONTENTS, {
        refetchQueries: () => [{
            query: SEEBUYME_GROUP,
            variables: { 
                groupRoomId,
                pageNumber: 0,
                items
            }
        }]
    });
    
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
            setButtonLoading(true);
            const {
                data: {
                    createBuyMeGroup: { category }
                }
            } = await createBuyMeGroupMutation({
                variables: {
                    groupRoomId,
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
            Alert.alert("작성이 취소 되었습니다.");
        } finally {
            setButtonLoading(false);
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
        navigation.navigate("RoomPost", { groupRoomId });
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
            try {
                setButtonLoading(true);
                const { 
                    data: {
                        createContents: { category }
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
            } catch (e) {
                console.log(e);
                Alert.alert("작성이 취소 되었습니다.");
            } finally {
                setButtonLoading(false);
            }
        } else {
            try {
                setButtonLoading(true);
                await coonnectContentsMutation({
                    variables: {
                        text: categoryContentInput.value,
                        categoryId: categoryIdState[categoryText]
                    }
                });
                categoryContentInput.setValue("");
            } catch (e) {
                console.log(e);
                Alert.alert("작성이 취소 되었습니다.");
            } finally {
                setButtonLoading(false);
            }
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
        Alert.alert("작성이 완료 되었습니다.");
        navigation.navigate("RoomPost", { groupRoomId });
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
            <Touchable  onPress={() => {
                navigation.navigate("RoomPost", { groupRoomId });
            }}>
                <BackButtonContainer>
                    <NavIcon
                        focused={false}
                        name={Platform.OS === "ios" 
                            ? "ios-arrow-back" 
                            : "md-arrow-back"
                        }
                />
                </BackButtonContainer>
            </Touchable>
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
                        loading={buttonLoading}
                    />
                    <ButtonPaper
                        onPress={view === "default"
                            ? handleConfirm
                            : handleAddConfirm
                        }
                        text="작성 하기"
                        loading={buttonLoading}
                    />
                </AlignCenterButton>
            </Container>
        </ScrollView>
    );
};