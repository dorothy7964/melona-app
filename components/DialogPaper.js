import React from "react";
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";

const GreyBold = styled.Text`
    font-weight: 600;
    color: ${props => props.theme.darkGreyColor};
`;

const Bold = styled.Text`
    font-weight: 600;
`;

const DialogPaper = ({
    title,
    postId,
    visible,
    handleAbort,
    handleCancel,
    handleToggleDialog
}) => (
    <Portal>
        <Dialog
            visible={visible}
            onDismiss={handleToggleDialog}
        >
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>
                <Paragraph>신청을 취소 하시겠습니까?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => handleAbort()}>
                    <GreyBold>취소</GreyBold>
                </Button>
                <Button onPress={() => handleCancel(postId)}>
                    <Bold>확인</Bold>
                </Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
);

DialogPaper.propTypes = {
    title: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    handleAbort: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleToggleDialog: PropTypes.func.isRequired,
};

export default DialogPaper;