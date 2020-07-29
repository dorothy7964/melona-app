import React, { useState } from "react";
import { ScrollView, RefreshControl, Alert, Platform } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { Card } from "react-native-paper";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import NavIcon from "../../components/NavIcon";
import ButtonPaper from "../../components/ButtonPaper";
import TextInputPaper from "../../components/TextInputPaper";
import GroupAddMember from "../../componentsGroup/GroupAddMember";
import { ALL_GROUPROOM } from "../../screens/Group/GroupQueries";
import { CREATE_GROUPROOM } from "./WriteQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 10px;
    padding:30px;
`;

const AlignCenter = styled.View`
    margin: 15px 0;
    align-items: center;
`;

const Image = styled.Image`
    width: 150px;
    height: 100px;
`;

const CoverPhotoTextBox = styled.TouchableOpacity`
    margin: 15px auto;
    flex-direction: row;
    align-items: center;
`;

const Section = styled.View`
    margin: 20px 10px;
`;

const MemberUserBox = styled.View`
    margin: 20px 10px;
    margin-bottom: 50px;
`;

const MemberSection = styled.View`
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

const MemberButtonBox = styled.View`
    margin-left: 10px;
    flex-direction: row;
    align-items: center;
`;

const Bold = styled.Text`
    color: ${props => props.theme.melonaColor};
    margin-left: 10px;
    font-size: 17px;
    font-weight: 600;
`;

const GreyBold = styled.Text`
    color: ${props => props.theme.darkGreyColor};
    font-size: 17px;
    font-weight: 600;
`;

const BoldMarginBoth = styled.Text`
    color: ${props => props.theme.melonaColor};
    margin: 0 10px;
    font-size: 17px;
    font-weight: 600;
    color: ${props => props.memberView 
        ? props.theme.darkGreyColor 
        : props.theme.melonaColor};
`;
                    
export default ({ navigation }) => {
    const groupInput = useInput("");
    const [refreshing, setRefreshing] = useState(false);
    const [memberView, setMemberView] = useState(false);
    const [userMember, setUserMember] = useState([]);
    const [coverPhoto, setCoverPhoto] = useState("https://pbs.twimg.com/profile_images/926440213475246080/BkBTGG8b_400x400.jpg");
    const [createGroupRoomMutation] = useMutation(CREATE_GROUPROOM, {
        refetchQueries: () => [{ query: ALL_GROUPROOM }]
    });

    const refresh = async () => {
        try {
            setRefreshing(true);
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    const handleToggleOpen = () => {
        setMemberView(!memberView)
    };

    const handleConfirm = async() => {
        if (groupInput.value === "") {
           return Alert.alert("그룹 이름을 작성 해주세요.");

        } else if (userMember.length === 0) {
            return Alert.alert("그룹 인원을 추가해주세요.");
        }

        try {
            await createGroupRoomMutation({
                variables: {
                    coverPhoto, 
                    roomName: groupInput.value, 
                    userName: userMember
                }
            });
            navigation.navigate("GroupNavigation", { screen: "RoomCard" });
        } catch (e) {
            console.log(e);
            Alert.alert("업로드 실패하였습니다.");
        }
        Alert.alert("완료 되었습니다.");
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
                        source={require('../../assets/togeter.png')}
                    />
                </AlignCenter>
                <Card.Cover 
                    source={{ uri: `${coverPhoto}` }} 
                />
                <CoverPhotoTextBox onPress={() => null}>
                    <NavIcon
                        size={25}
                        focused={true}
                        name={Platform.OS === "ios" 
                            ? "ios-camera" 
                            : "md-camera"
                        }
                    />
                    <Bold>이미지 변경</Bold>
                </CoverPhotoTextBox>
                <Section>
                    <TextInputPaper 
                        { ...groupInput }
                        placeholder="그룹 이름"
                    /> 
                </Section>
                <MemberUserBox>
                    <MemberSection>
                        <GreyBold>그룹 인원 선택</GreyBold>
                        <Touchable onPress={handleToggleOpen}>
                            <MemberButtonBox>
                                <BoldMarginBoth memberView={memberView}>
                                    인원 보기
                                </BoldMarginBoth>
                                <NavIcon
                                    size={25}
                                    focused={memberView ? false : true}
                                    name={Platform.OS === "ios" 
                                        ? memberView 
                                            ?  "ios-arrow-dropup" 
                                            :  "ios-arrow-dropdown" 
                                        : memberView 
                                            ?  "md-arrow-dropup" 
                                            :  "md-arrow-dropdown" 
                                    }
                                />
                            </MemberButtonBox>
                        </Touchable>
                    </MemberSection>
                    <GroupAddMember
                        memberView={memberView}
                        userMember={userMember}
                    />
                </MemberUserBox>
                <ButtonPaper
                    onPress={handleConfirm}
                    text="작성 하기"
                    loading={false}
                />
            </Container>
        </ScrollView>
    );
};