import React from "react";
import { Avatar } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Text = styled.Text`
    margin-left: 5px;
`;

const Touchable = styled.TouchableOpacity``;

const PostViewBox = ({ 
    postId, 
    viewApply, 
    anotherPage, 
    handleRoute 
}) => {
    if (viewApply) {
        return (
            <Touchable onPress={() => handleRoute("progress", postId)}>
                <Container>
                    <Avatar.Image 
                        size={30} 
                        style={{ backgroundColor: "#fff" }}
                        source={
                            !anotherPage 
                                ? require('../assets/daddy.png')
                                : require('../assets/daughter.png')
                        }
                    />
                    <Text>신청자 완료</Text>
                </Container>
            </Touchable>
        );
    } else {
        return (
            <Touchable onPress={() => handleRoute("viewApply", postId)}>
                <Container>
                    <Avatar.Image 
                        size={30} 
                        style={{ backgroundColor: "#fff" }}
                        source={
                            !anotherPage 
                                ? require('../assets/daddy.png')
                                : require('../assets/daughter.png')
                        }
                    />
                    <Text>신청자 보기</Text>
                </Container>
            </Touchable>
        );
    }
};

PostViewBox.propTypes = {
    postId : PropTypes.string.isRequired,
    viewApply : PropTypes.bool.isRequired,
    anotherPage : PropTypes.bool.isRequired,
    handleRoute : PropTypes.func.isRequired,
}

export default PostViewBox;