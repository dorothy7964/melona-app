import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform, Alert, View } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import PostNone from "./PostNone";
import UserCard from "./UserCard";
import ButtonPaper from "./ButtonPaper";
import ApplyUser from "./ApplyUser";
import { SEE_BUY_ONE, DELETE_POST, TOGGLE_VIEWAPPLY } from "../SharedQueries";
import styles from "../styles";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 25px 10px;
`;

const ApplyContainer = styled(Card)`
    margin: 10px;
`;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: 15px;
`;

const PostNoneBox = styled.View`
    margin-top: 100px;
`;

const ButtonBox = styled.View`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`;

const ButtonContainer = styled.View`
    display: flex;
    align-items: center;
`;

const ViewApply = ({
    postId,
    handleRoute
}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [deletePostMutation] = useMutation(DELETE_POST);
    const [toggleViewApplyMutation] = useMutation(TOGGLE_VIEWAPPLY);

    const { data, loading, refetch } = useQuery(SEE_BUY_ONE, {
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

    const handleDelete = async(postId) => {
        try {
            await deletePostMutation({
                variables: { postId }
            });
            handleRoute("post", "");
            return Alert.alert("게시물이 삭제 되었습니다.");
        } catch (e) {
            console.log(e);
        }
    };

    const handleBackRoute = () => {
        handleRoute("post", "");
    };

    const handleComplete = async(postId) => {
        try {
            await toggleViewApplyMutation({
                variables: { postId }
            });
        } catch (e) {
            console.log(e);
        }
        handleRoute("post", "");
        return Alert.alert("완료 되었습니다.");
    };

    if (loading === true){
        return <Loader />

    } else if ( data === undefined || data.seeBuyOne === undefined) {
        return <Loader />

    } else {
        const { 
            seeBuyOne: {
                user: {
                    avatar,
                    userName
                },
                applys,
                applysCount,
                location,
                lastDate,
                categorys,
                anotherPage,
            }
        } = data;

        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                <Touchable onPress={() => handleBackRoute(postId)}>
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
                <Container>
                    <Card.Content>
                        <UserCard 
                            avatar={avatar}
                            userName={userName}
                            applysCount={applysCount}
                            location={location}
                            lastDate={lastDate}
                        />
                    </Card.Content>
                </Container>
                {applysCount === 0 && 
                    <View>
                        <ButtonBox>
                            <ButtonPaper
                                text="게시물 삭제"
                                mode="contained"
                                primaryColor={styles.redColor}
                                onPress={() => handleDelete(postId)}
                            />
                        </ButtonBox>
                        <PostNoneBox>
                            <PostNone /> 
                        </PostNoneBox>
                    </View>
                }
                {applysCount !== 0 && 
                    <View>
                        {applys.map(apply => (
                            <ApplyContainer key={apply.id}>
                                <Card.Content>
                                    <ApplyUser 
                                        avatar={apply.user.avatar} 
                                        userName={apply.user.userName} 
                                        applyId={apply.id}
                                        applyReadCheck={apply.readCheck} 
                                        postId={postId}
                                        categorys={categorys}
                                        anotherPage={anotherPage}
                                    />
                                </Card.Content>
                            </ApplyContainer>
                        ))}
                        <ButtonContainer>
                            <ButtonPaper
                                text="완료 하기"
                                mode="text"
                                color={styles.blackColor}
                                primaryColor="#fff"
                                onPress={() => handleComplete(postId)}
                            />
                        </ButtonContainer>
                    </View>
                }
            </ScrollView>
        );
    }
};

ViewApply.propTypes = {
    postId: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
};

export default ViewApply;