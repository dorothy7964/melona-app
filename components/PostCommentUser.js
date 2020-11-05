import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform, View } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import TimeIapse from "./TimeIapse";
import PostCommentReUser from "./PostCommentReUser";
import AvatarPaper from "./AvatarPaper";
import { 
    SEE_COMMENT,
    DELETE_COMMENT
} from "../SharedQueries";

const Touchable = styled.TouchableOpacity``;

const CommentContainer = styled(Card)`
    display: flex;
    margin: 10px;
    padding: 20px;
    min-height: 350px;
`;

const Comments = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
`;

const Section = styled.View`
    flex-direction: column;
`;

const UserBox = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TextBox = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

const CommentBox = styled.View`
    flex: 1;
`;

const IconBox = styled.TouchableOpacity`
    margin-left: 10px;
`;

const TimeForm = styled.Text`
    flex-direction: row;
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

const Text = styled.Text`
    margin-left: 10px;
`;

const PostCommentUser = ({ 
    postId,
    handleReply
}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [reComment, setReComment] = useState(true);            // 대댓글이 있을 경우 보이기
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT);    // 댓글 삭제
    const { data, loading, refetch } = useQuery(SEE_COMMENT, {
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

    // 댓글 삭제
    const handleDelete = async(commentId) => {
        try {
            await deleteCommentMutation({
                variables: { commentId }
            });
            setTimeout(() => {
                refresh();
            }, 500);
        } catch (e) {
            console.log(e);
        }
    }

    // 대댓글 있을 경우 버튼 클릭
    const handleToggleReComment = () => {
        setReComment(!reComment);
    };

    if (loading === true){
        return <Loader />;
        
    } else if (!loading && data && data.seeComment) {
        const { seeComment } = data;

        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            > 
                <CommentContainer>
                    {seeComment && seeComment.map(comment => (
                        <View key={comment.id}>
                            <Section>
                                <Comments>
                                    <UserBox>
                                        <AvatarPaper 
                                            size={30}
                                            avatar={comment.user.avatar} 
                                        />
                                        {comment.user.isSelf
                                            ? <ColorTextBold>{comment.user.userName}</ColorTextBold>
                                            : <TextBold>{comment.user.userName}</TextBold>
                                        }
                                    </UserBox>
                                    <TextBox>
                                        <CommentBox>
                                            <Text>{comment.text}</Text>
                                        </CommentBox>
                                        {comment.user.isSelf && 
                                            <IconBox onPress={() => handleDelete(comment.id)}>
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
                                    {comment.reCommentCount !== 0 &&
                                        <IconBox onPress={handleToggleReComment}>
                                            <NavIcon
                                                size={20}
                                                focused={true}
                                                name={reComment
                                                    ? Platform.OS === "ios" 
                                                        ? "ios-arrow-dropup-circle" 
                                                        : "md-arrow-dropup-circle"
                                                    : Platform.OS === "ios" 
                                                        ? "ios-arrow-dropdown-circle" 
                                                        : "md-arrow-dropdown-circle"
                                                }
                                            />
                                        </IconBox>
                                    }
                                    <TimeForm>
                                        <TimeIapse 
                                            createAt={comment.createdAt}
                                        />
                                    </TimeForm>
                                    <IconBox 
                                        onPress={() => handleReply(
                                            comment.user.isSelf,
                                            comment.user.avatar,
                                            comment.user.userName,
                                            comment.id,
                                            comment.text
                                        )}
                                    >
                                        <NavIcon
                                            focused={false}
                                            name={Platform.OS === "ios" 
                                                ? "ios-return-left" 
                                                : "md-return-left"
                                            }
                                        />
                                    </IconBox>
                            </Comments>
                        </Section>
                        <Section>
                            {reComment && comment.reCommentCount !== 0 &&
                                <PostCommentReUser 
                                    comment={comment}
                                    refresh={refresh}
                                />
                            }
                        </Section>
                    </View>
                ))}
                </CommentContainer>
            </ScrollView>
        );
    }
};

PostCommentUser.propTypes = {
    postId: PropTypes.string.isRequired,
    handleReply: PropTypes.func.isRequired,
};

export default PostCommentUser;