import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, Platform, Alert, View } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery, useMutation } from "react-apollo-hooks";
import { 
    SEE_BUY_ONE, 
    DELETE_CONTENTS, 
    FALSE_APPLY,
    UNCONNECT_CONTENTSREQ
} from "../SharedQueries";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import UserCard from "./UserCard";
import WriteForm from "./WriteForm";
import WriteFormMe from "./WriteFormMe";
import ButtonPaper from "./ButtonPaper";

const Touchable = styled.TouchableOpacity``;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: 15px;
`;

const ScrollContainer = styled.View`
    margin-top: 25px;
    margin-bottom: 50px;
`;

const Container = styled(Card)`
    margin: 25px 10px;
`;

const CategoryContainer = styled(Card)`
    margin: 0 10px;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
    align-items: center;
    margin-bottom: 20px;
`;

const WriteApply = ({ postId, handleRoute }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [falseApplyMutation] = useMutation(FALSE_APPLY);
    const [deleteContentsMutation] = useMutation(DELETE_CONTENTS);
    const [unConnectContentsReqMutation] = useMutation(UNCONNECT_CONTENTSREQ);
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

    const handleBackRoute = async(postId) => {
        try {
            await deleteContentsMutation({
                variables: {
                    postId
                } 
            });
            await falseApplyMutation({
                variables: {
                    postId
                }   
            }); 
            await unConnectContentsReqMutation({
                variables: {
                    postId
                }   
            }); 
        } catch (e) {
            console.log(e);
        }
        handleRoute("post", "");
        return Alert.alert("신청하신 내용은 삭제됩니다.");
    };

    const handleComplete = () => {
        handleRoute("post", "");
        return Alert.alert("신청 완료 되었습니다.");
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
                applysCount,
                location,
                lastDate,
                categorys,
                anotherPage
            }
        } = data;

        return (
            <View>
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
                {loading 
                    ?   <Loader /> 
                    :  (data && data.seeBuyOne && 
                        <ScrollContainer>
                            <ScrollView 
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                                }
                            >
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
                                {categorys.map(category =>  (
                                    <CategoryContainer key={category.id}>
                                        <Card.Content>
                                            {!anotherPage
                                                ?   <WriteForm 
                                                        postId={postId}
                                                        categoryId={category.id}
                                                        categoryText={category.text}
                                                    />
                                                :   <WriteFormMe 
                                                        postId={postId}
                                                        category={category}
                                                    />
                                            }
                                        </Card.Content>
                                    </CategoryContainer>
                                ))}
                                <ButtonContainer>
                                    {!anotherPage
                                        ?   <ButtonPaper
                                                text="완료 하기"
                                                mode="text"
                                                color="#262626"
                                                primaryColor="#fff"
                                                onPress={() => handleComplete()}
                                            />
                                        :   <ButtonPaper
                                                text="완료 하기"
                                                mode="text"
                                                color="#262626"
                                                primaryColor="#fff"
                                                onPress={() => handleComplete()}
                                            />
                                    }
                                </ButtonContainer>
                            </ScrollView>
                        </ScrollContainer>
                    )
                }
            </View>
        );
    }
};

export default WriteApply;


