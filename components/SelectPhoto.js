import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "./Loader";
import ButtonPaper from "./ButtonPaper";
import constants from "../constants";

const View = styled.View`
    justify-content: center;
`;

const FirstImgBox = styled.View`
    margin-bottom: 10px;
`;

export default () => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState();

    const changeSelected = (photo) => {
        setSelected(photo);
    };

    const getPhotos = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync();
            const [firstPhoto] = assets;
            setSelected(firstPhoto);
            setAllPhotos(assets);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
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

    useEffect(() => {
        askPermission();
    }, []);

    return(
        <View>
            {loading? (
                <Loader />
            ) : (
                <View>
                    {hasPermission? (
                        <React.Fragment>
                            <FirstImgBox>
                                <Image
                                    source={{ uri: selected.uri }}
                                    style={{ width: constants.width, height: constants.height / 2 }}
                                />
                                <ButtonPaper
                                    onPress={() => null}
                                    text="사진 적용"
                                    loading={false}
                                />
                            </FirstImgBox>
                            <ScrollView
                                contentContainerStyle={{
                                    flexDirection: "row",
                                    flexWrap: "wrap"
                                }}
                            >
                                {allPhotos.map(photo => (
                                    <TouchableOpacity
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
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </React.Fragment>
                    ) : null}
                </View>
            )}
        </View>
    );
};