import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform } from "react-native";
import { View } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import TimeIapse from "./TimeIapse";
import AvatarPaper from "./AvatarPaper";
import { REDELETE_COMMENT } from "../SharedQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    margin: 0 15px;
    margin-bottom: 10px;
`;

const Comments = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
`;

const UserBox = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`;

const TextBox = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

const TimeForm = styled.Text`
    flex-direction: row;
    margin-left: 10px;
`;

const IconBox = styled.TouchableOpacity`
    margin-left: 10px;
`;

const ColorTextBold = styled.Text`
    color: ${props => props.theme.melonaColor};
    font-weight: 600;
    margin-left: 10px;
`;

const TextBold = styled.Text`
    font-weight: 600;
    margin-left: 10px;
`;

const CommentText = styled.Text`
    borderRadius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
    background-color: ${props => props.theme.lightGreyColor};
`;

const PostCommentReUser = ({ 
    comment,
    refresh
}) => {
    const [redeleteCommentMutation] = useMutation(REDELETE_COMMENT);
    
    const handleReDelete = async(recommentId) => {
        try {
            await redeleteCommentMutation({
                variables: { recommentId }
            });
            setTimeout(() => {
                refresh();
            }, 500);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            {comment.recomments.map(recomment => (
                <Comments key={recomment.id}>
                    <NavIcon
                        focused={false}
                        name={Platform.OS === "ios" 
                            ? "ios-return-right" 
                            : "md-return-right"
                        }
                    />
                    <UserBox>
                        <AvatarPaper 
                            size={30}
                            avatar={recomment.user.avatar} 
                        />
                        {recomment.user.isSelf
                            ? <ColorTextBold>{recomment.user.userName}</ColorTextBold>
                            : <TextBold>{recomment.user.userName}</TextBold>
                        }
                    </UserBox>
                    <TextBox>
                        <CommentText>{recomment.text}</CommentText>
                        {recomment.user.isSelf && 
                            <IconBox onPress={() => handleReDelete(recomment.id)}>
                                <NavIcon
                                    size={20}
                                    focused={false}
                                    name={Platform.OS === "ios" 
                                        ? "ios-close-circle-outline" 
                                        : "md-close-circle-outline"
                                    }
                                />
                            </IconBox>
                        }
                    </TextBox>
                    <TimeForm>
                        <TimeIapse 
                            createAt={recomment.createdAt}
                        />
                    </TimeForm>
                </Comments>
            ))}
        </Container>
    )
};

PostCommentReUser.propTypes = {
    comment: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
};

export default PostCommentReUser;