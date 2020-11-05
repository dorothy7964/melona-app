import React, { useState, useEffect } from "react";
import { ScrollView, Alert, Image, View,Text } from "react-native";
import { Card } from "react-native-paper";
import { useMutation } from "react-apollo-hooks";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import styled from "styled-components";
import Loader from "./Loader";
import AvatarPaper from "./AvatarPaper";
import ButtonPaper from "./ButtonPaper";
import constants from "../constants";
import { ME, EDIT_AVATAR } from "../screens/Tabs/TabsQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 30px 20px;
    padding: 20px 15px;
    min-height: 580px;
`;

const AvatarBox = styled.View`
    margin: 0 auto;
`;

const PhotoGallery = styled.View`
    flex: 1;
    margin-top: 10px;
    flex-direction: row;
    justify-content: center;
    margin-left: 15px;
`;

const LoaderBox = styled.View`
    margin-right: 15px;
`;

const ButtonBox = styled.View`
    margin-top: 30px;
`;

export default ({ 
    loadingBt,
    avatarMe,
    toggleLoadingBt,
    toggleEditAvatar,
}) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState([]);
    const [uploadPhotoFile, setUploadPhotoFile] = useState(avatarMe);
    const [uploadPhotoFileName, setUploadPhotoFileName] = useState("none");
    const [editAvatarMutaion] = useMutation(EDIT_AVATAR, {
        refetchQueries: () => [{ query: ME }]
    });

    const getPhotos = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync();
            const [firstPhoto] = assets;
            setSelected(firstPhoto);
            setAllPhotos(assets);
        } catch (e) {
            console.log(e);
        } 
    };

    const askPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status === "granted"){
                setHasPermission(true);
                getPhotos();
            }
        } catch(e) {
            console.log(e);
            setHasPermission(false);
        }
    };
    
    const changeSelected = (photo) => {
        setSelected(photo);
        setUploadPhotoFile(photo.uri);
        setUploadPhotoFileName(photo.filename);
    };

    const handleConfirm = async() => {
        try {
            toggleLoadingBt(true);
            if (uploadPhotoFileName !== "none"){
                const formData = new FormData();
                formData.append("file", {
                    name: uploadPhotoFileName,
                    type: "image/jpeg",
                    uri: uploadPhotoFile
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
                    data: { editAvatar }
                } = await editAvatarMutaion({
                    variables: {
                        avatar: location
                    }
                });
                if (editAvatar){
                    Alert.alert("프로필이 변경 되었습니다.");
                }
            }
        } catch (e) {
            Alert.alert("다시 프로필을 선택 해주세요.");
            toggleLoadingBt(false);
            toggleEditAvatar(true);
        } finally {
            toggleLoadingBt(false);
            toggleEditAvatar(false);
        }
    };

    useEffect(() => {
        askPermission();
    }, []);

    return (
        <Container>
            <AvatarBox>
                <AvatarPaper 
                    size={100}
                    avatar={uploadPhotoFile}
                />
            </AvatarBox>
            <PhotoGallery>
                {hasPermission && allPhotos.length !== 0 
                    ? <ScrollView
                            contentContainerStyle={{
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                        >
                            {allPhotos.map(photo => (
                                <Touchable
                                    key={photo.id}
                                    onPress={() => changeSelected(photo)}
                                >
                                    <Image
                                        source={{ uri: photo.uri }}
                                        style={{
                                            width: constants.width / 4,
                                            height: constants.height / 6,
                                            opacity: photo.id === selected.id ? 0.5 : 1
                                        }}
                                    />
                                </Touchable>
                            ))}
                        </ScrollView>
                    :   <LoaderBox>
                            <Loader />
                        </LoaderBox>
                }
            </PhotoGallery>
            <ButtonBox>
                <ButtonPaper
                    onPress={handleConfirm}
                    text="프로필 편집하기"
                    loading={loadingBt}
                />
            </ButtonBox>
        </Container>
    );
};