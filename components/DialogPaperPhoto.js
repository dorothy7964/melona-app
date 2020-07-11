import React from "react";
import { Button, Dialog, Portal } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
    align-items: center;
    margin-bottom: 10px;
`;

const ImageBox = styled.Image`
    borderRadius: 10;
    width: 200px;
    height: 200px;
`;

const GreyBold = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.darkGreyColor};
`;

const BlackText = styled.Text`
    font-size: 20px;
`;

const Bold = styled.Text`
    font-size: 15px;
    font-weight: 600;
`;

const DialogPaperPhoto = ({
    categoryText,
    contentText,
    confirmFile,
    visible,
    handleToggleDialog
}) => (
    <Portal>
        <Dialog
            visible={visible}
            onDismiss={handleToggleDialog}
        >
            <Dialog.Title>인증 사진 보기</Dialog.Title>
            <Dialog.Content>
                <Container>
                    <ImageBox 
                        source={ confirmFile === "none"
                            ? require('../assets/confirmFileText_App.png')
                            : { uri: `${confirmFile}` }
                        }
                    />
                </Container>
                <GreyBold># {categoryText}</GreyBold>
                <BlackText>{contentText}</BlackText>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleToggleDialog}>
                    <Bold>확인</Bold>
                </Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
);

DialogPaperPhoto.propTypes = {
    categoryText: PropTypes.string,
    contentText: PropTypes.string,
    confirmFile: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    handleToggleDialog: PropTypes.func.isRequired,
};

export default DialogPaperPhoto;