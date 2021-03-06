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

const AllImgBox = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default ({ handleChangeFile }) => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState();
    const [btDisabled, setBtDisabled] = useState(false);
    const [viewAllPhoto, setViewAllPhoto] = useState(true);

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

    const handleApplyPhoto = (photo) => {
        setViewAllPhoto(false);
        setBtDisabled(true);
        handleChangeFile(photo, "album");
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
                                    style={{ width: constants.width, height: constants.height / 2, }}
                                />
                                <ButtonPaper
                                    onPress={() => handleApplyPhoto(selected)}
                                    text="사진 적용"
                                    loading={false}
                                    disabled={btDisabled}
                                />
                            </FirstImgBox>
                            {viewAllPhoto && <AllImgBox>
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
                                                    width: 179,
                                                    height: 179,
                                                    opacity: photo.id === selected.id ? 0.5 : 1
                                                }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </AllImgBox>}
                        </React.Fragment>
                    ) : null}
                </View>
            )}
        </View>
    );
};