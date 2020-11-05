import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import UserCard from "./UserCard";
import AvatarPaper from "./AvatarPaper";
import ButtonPaper from "./ButtonPaper";
import TextInputPaper from "./TextInputPaper";
import PostCommentUser from "./PostCommentUser";
import useInput from "../hooks/useInput";
import { 
    SEE_BUY_ONE, 
    SEE_COMMENT, 
    ADD_COMMENT, 
    CONNECT_REPLY 
} from "../SharedQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 20px 10px;
`;

const UserContainer = styled(Card)`
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 7px;
`;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: 15px;
`;

const CommentContainer = styled.View`
    height: ${props => props.isHeight
        ? `265px`
        : `350px`
    };
`;

const ReInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin:0 10px;
    margin-top: 20px;
    borderWidth: 1;
    borderColor: ${props => props.theme.darkGreyColor};
    background-color: #fff;
    padding: 20px;
`;

const ReInfoTextBold = styled.Text`
    font-weight: 600;
    margin-left: 10px;
`;

const ReInfoText = styled.Text`
    margin-left: 10px;
`;

const IconBox = styled.TouchableOpacity`
    margin-right: 10px;
`;

const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
`;

const ButtonBox = styled.View`
    margin-left: 20px;
`;

const PostCommentBox = ({ 
    postId,
    handleRoute,
}) => {   
    // 답글할 유저 정보
    const [isReply, setIsReply] = useState(false);
    const [replyComment, setReplyComment] = useState({});

    // 댓글 달기
    const commentInput = useInput("");
    const [inputView, setInputView] = useState(false);
    const [connectReplyMutation] = useMutation(CONNECT_REPLY);
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: { postId, text: commentInput.value }
    });

    const [refreshing, setRefreshing] = useState(false);
    const { refetch } = useQuery(SEE_COMMENT, {
        variables: { postId }
    })
    const { data, loading } = useQuery(SEE_BUY_ONE, {
        variables: { postId }
    });

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    // 대댓글 할 유저 정보
    const handleReply = (isSeif, avatar, userName, commentId, text) => {
        setIsReply(!isReply);
        setReplyComment({
            avatar,
            userName,
            commentId,
            text
        });
    }

    // 대댓글 유저 정보 안 보기
    const handleRemoveIsReply = () => {
        setIsReply(false);
        commentInput.setValue("");
    };

    // 댓글 달기 전송 버튼
    const handleSubmit = async() => {
        console.log(
            "commentId > ",replyComment.commentId,
            "text > ",commentInput.value,
        )
        // 대댓글 달기
        if (isReply){
            try {
                setInputView(true);
                setIsReply(false);
                commentInput.setValue("");
                setTimeout(() => {
                    refresh();
                }, 500);
                return await connectReplyMutation({
                    variables: {
                        commentId: replyComment.commentId,
                        text: commentInput.value
                    }
                });
            } catch {
                console.log(e);
            } finally {
                setInputView(false);
            }
        } 
        try {
            setInputView(true);
            setIsReply(false);
            await addCommentMutation();
            commentInput.setValue("");
            setTimeout(() => {
                refresh();
            }, 500);
        } catch {
            console.log(e);
        } finally {
            setInputView(false);
        }
    };

    if (loading === true){
        return <Loader />;
        
    } else if (!loading && data && data.seeBuyOne) {
        const { 
            seeBuyOne: {
                user: {
                    avatar,
                    userName,
                },
                applysReadCount,
                location,
                lastDate,
            }
        } = data;

        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            > 
                <Touchable onPress={() => handleRoute("post", "")}>
                    <BackButtonContainer>
                        <NavIcon
                            focused={false}
                            name={Platform.OS === "ios" 
                                ? "ios-arrow-back" 
                                : "md-arrow-back"
                            }
                        />
                    </BackButtonContainer>
                </Touchable>
                <UserContainer>
                    <Card.Content>
                        <UserCard 
                            avatar={avatar}
                            userName={userName}
                            applysCount={applysReadCount}
                            location={location}
                            lastDate={lastDate}
                        />
                    </Card.Content>
                </UserContainer>
                <CommentContainer isHeight={isReply}>
                    <PostCommentUser 
                        postId={postId}
                        handleReply={handleReply}
                    />
                </CommentContainer>
                {isReply &&
                    <ReInfoContainer>
                        <IconBox onPress={handleRemoveIsReply}>
                            <NavIcon
                                size={20}
                                focused={false}
                                name={Platform.OS === "ios" 
                                    ? "ios-remove-circle-outline" 
                                    : "md-remove-circle-outline"
                                }
                            />
                        </IconBox>
                        <AvatarPaper 
                            size={30}
                            avatar={replyComment.avatar} 
                        />
                        <ReInfoTextBold>{replyComment.userName}</ReInfoTextBold>
                        <ReInfoText>{replyComment.text}</ReInfoText>
                    </ReInfoContainer>
                }
                <Container>
                    <InputContainer>
                        <TextInputPaper
                            { ...commentInput }
                            placeholder="댓글 달기"
                        />
                        <ButtonBox>
                            <ButtonPaper
                                widthSize="constants.width / 5"
                                onPress={handleSubmit}
                                text="전송"
                                loading={inputView}
                            />
                        </ButtonBox>
                    </InputContainer>
                </Container>
            </ScrollView>
        );
    }
};

PostCommentBox.propTypes = {
    postId: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
};

export default PostCommentBox;