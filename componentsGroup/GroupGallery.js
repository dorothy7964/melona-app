import React, { useState, useEffect } from "react";
import { ScrollView, Image, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../components/Loader";
import ButtonPaper from "../components/ButtonPaper";

const Touchable = styled.TouchableOpacity``;

const PhotoGallery = styled.View`
    flex: 1;
    margin-top: 10px;
    flex-direction: row;
    justify-content: center;
`;

const LoaderBox = styled.View`
    margin-right: 15px;
`;

const ButtonBox = styled.View`
    margin-top: 10px;
`;

export default ({
    handleChangeCover,
    handleToggleGallery,
}) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState([]);

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
        handleChangeCover(photo);
    };

    useEffect(() => {
        askPermission();
    }, []);

    return (
        <View>
            <ButtonBox>
                <ButtonPaper
                    onPress={handleToggleGallery}
                    text="사진 선택"
                />
            </ButtonBox>
            <PhotoGallery>
                {hasPermission && allPhotos.length !== 0 
                    ? <View>
                            <ScrollView
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
                                                width: 165,
                                                height: 165,
                                                opacity: photo.id === selected.id ? 0.5 : 1
                                            }}
                                        />
                                    </Touchable>
                                ))}
                            </ScrollView>
                        </View>
                    :   <LoaderBox>
                            <Loader />
                        </LoaderBox>
                }
            </PhotoGallery>
        </View>
    );
};