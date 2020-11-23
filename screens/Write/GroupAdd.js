import React, { useState } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { Card } from "react-native-paper";
import styled from "styled-components";
import axios from "axios";
import useInput from "../../hooks/useInput";
import GroupWrite from "../../componentsGroup/GroupWrite";
import GroupGallery from "../../componentsGroup/GroupGallery";
import { ALL_GROUPROOM } from "../../screens/Group/GroupQueries";
import { CREATE_GROUPROOM } from "./WriteQueries";

const Touchable = styled.TouchableOpacity``;

const Wrapper = styled.View`
    margin-top: 30px;
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
    width: 150px;
    height: 100px;
`;
                    
export default ({ navigation }) => {
    const coverImg = "https://pbs.twimg.com/profile_images/926440213475246080/BkBTGG8b_400x400.jpg";
    const groupInput = useInput("");
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewGallery, setViewGallery] = useState(false);
    const [memberView, setMemberView] = useState(false);
    const [userMember] = useState([]);
    const [coverPhoto, setCoverPhoto] = useState(coverImg);
    const [coverPhotoName, setCoverPhotoName] = useState("");
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

    const handleToggleGallery = () => {
        setViewGallery(!viewGallery);
    };

    const handleChangeCover = (photo) => {
        setCoverPhoto(photo.uri);
        setCoverPhotoName(photo.filename);
    };    

    const handleConfirm = async() => {
        if (groupInput.value === "") {
           return Alert.alert("그룹 이름을 작성 해주세요.");

        } else if (userMember.length === 0) {
            return Alert.alert("그룹 인원을 추가해주세요.");
        } else {
            try {
                setLoading(true);
                setMemberView(false);
                const formData = new FormData();
                formData.append("file", {
                    name: coverPhotoName,
                    type: "image/jpeg",
                    uri: coverPhoto
                });
                const { 
                    data: { location } 
                } = await axios.post("https://melona-backend.herokuapp.com/api/upload", formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
                const {
                    data: { createGroupRoom }
                } = await createGroupRoomMutation({
                    variables: {
                        coverPhoto: location, 
                        roomName: groupInput.value, 
                        userName: userMember
                    }
                });
                if (createGroupRoom){
                    Alert.alert("완료 되었습니다.");
                }
                navigation.navigate("GroupNavigation", { screen: "RoomCard" });
            } catch (e) {
                console.log(e);
                Alert.alert("업로드 실패하였습니다.");
            } finally {
                setLoading(false);
                setMemberView(false);
            }
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
                        source={require('../../assets/togeter.png')}
                    />
                </AlignCenter>
                <Touchable onPress={handleToggleGallery}>
                    <Card.Cover 
                        source={{ uri: `${coverPhoto}` }} 
                    />
                </Touchable>
                <Wrapper>
                    {viewGallery
                        ?   <GroupGallery 
                                handleChangeCover={handleChangeCover}
                                handleToggleGallery={handleToggleGallery}
                            />
                        :   <GroupWrite 
                                loading={loading}
                                groupInput={groupInput}
                                memberView={memberView}
                                userMember={userMember}
                                handleToggleOpen={handleToggleOpen}
                                handleConfirm={handleConfirm}
                            />
                    }
                </Wrapper>
            </Container>
        </ScrollView>
    );
};