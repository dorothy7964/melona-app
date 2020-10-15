import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from "expo-camera";
import { Ionicons } from '@expo/vector-icons';
import styled from "styled-components";
import styles from "../styles";
import constants from "../constants";
import Loader from "./Loader";

const View = styled.View`
    margin: 0 auto;
`;

const TakeButton = styled.View`
    margin: 20px 0;
    align-items: center;
    margin-right: 50px;
`;

const Button = styled.View`
    width: 70px;
    height: 70px;
    border-radius: 40px;
    border: 10px solid ${styles.lightGreyColor};
`;

export default ({ contentId, anotherPage, handleChangeFile }) => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [canTakePhoto, setCanTakePhoto] = useState(true);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef();

    const takePhoto = async() => {
        if(!canTakePhoto){
            return;
        }
        try {
            setCanTakePhoto(false);
            const { uri } = await cameraRef.current.takePictureAsync({
                quality: 1
            });
            const asset = await MediaLibrary.createAssetAsync(uri);
            handleChangeFile(contentId, anotherPage, asset, "camera");
        } catch (e) {
            console.log(e);
            setCanTakePhoto(true);
        }
    };

    const askPermission = async () => {
        try {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			if(status === "granted"){
				setHasPermission(true);
			}
        } catch(e) {
			console.log(e);
			setHasPermission(false);
        } finally {
            setLoading(false);
        }
      };

      const toggleType = () => {
        if (cameraType === Camera.Constants.Type.front){
            setCameraType(Camera.Constants.Type.back);  
        } else {
            setCameraType(Camera.Constants.Type.front);  
        }
    };
    
	useEffect(() => {
		askPermission();
	}, []);
	
    return (
		<View>
            {loading ? (
				<Loader />
            ) : hasPermission ? (
                <React.Fragment>
                    <Camera
                        ref={cameraRef}
                        type={cameraType}
                        style={{
                            width:constants.width,
                            height:constants.height / 2,
                            justifyContent: "flex-end",
                            padding: 15
                        }}>
                        <TouchableOpacity onPress={toggleType}>
                            <Ionicons 
                                name={Platform.OS === "ios" 
                                    ? "ios-reverse-camera" 
                                    : "md-reverse-camera"
                                } 
                                size={28} 
                                color={styles.blackColor}/>
                        </TouchableOpacity>
                    </Camera>
                    <TakeButton>
                        <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
                            <Button />
                        </TouchableOpacity>
                    </TakeButton>
                </React.Fragment>
            ) : null}
        </View>
    );
};