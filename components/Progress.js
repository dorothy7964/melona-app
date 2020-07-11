import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform, View } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import UserCard from "./UserCard";
import ProgressCardPost from "./ProgressCardPost";
import ProgressCardUser from "./ProgressCardUser";
import ProgressCardPhoto from "./ProgressCardPhoto";
import { SEE_BUY_ONE } from "../SharedQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 25px 10px;
`;

const CardPostContainer = styled(Card)`
    margin: 10px;
`;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: 15px;
`;

const TextBox = styled.View`
    flex-direction: row;
    margin: 0 10px;
    margin-bottom: 25px;
    align-items: center;
`;

const Text = styled.Text`
    background-color: ${props => props.theme.lightGreyColor};
    width: 20%;
    font-size: 16px;
    padding: 10px;
`;

const UserText = styled.Text`
    background-color: #fff;
    width: 60%;
    font-size: 16px;
    padding: 10px;
`;

const Progress = ({
    postId,
    handleRoute
}) => {
    const [view, setView] = useState("post");
    const [viewUser, setViewUser] = useState("");
    const [refreshing, setRefreshing] = useState(false);
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

    const handleAction = (view, userName) => {
        setView(view);
        setViewUser(userName);
        if (view === "post") {
            setTimeout(() => {
                refresh();
            }, 500);
        }
    };

    const handleRouteBack = (route) => {
        if (route === "post") {
            return handleRoute("post", "");
        } else if (route === "user") {
            setView("post");
            setViewUser("");
            return;
        } else if (route === "photo") {
            setView("post");
            setViewUser("");
            return;
        }
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
                    userName,
                    isSelf
                },
                applysRead,
                applysReadCount,
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
                <Touchable onPress={() => handleRouteBack(view)}>
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
                            applysCount={applysReadCount}
                            location={location}
                            lastDate={lastDate}
                        />
                    </Card.Content>
                </Container>
                {view === "post" && (
                    <View>
                        {applysRead.map(apply => (
                            <CardPostContainer key={apply.id}>
                                <Card.Content>
                                    <ProgressCardPost 
                                        avatar={apply.user.avatar}
                                        userName={apply.user.userName}
                                        progress={apply.progress}
                                        anotherPage={anotherPage}
                                        handleAction={handleAction}
                                    />
                                </Card.Content>
                            </CardPostContainer>
                        ))}
                    </View>
                )}
                {view === "user" && (
                    <ProgressCardUser 
                        isSelf={isSelf}
                        postId={postId}
                        userName={viewUser}
                        categorys={categorys}
                        anotherPage={anotherPage}
                        handleAction={handleAction}
                    />
                )}
                {view === "photo" && (
                    <View>
                        <TextBox>
                            <Text>신청자</Text>
                            <UserText>{viewUser}</UserText>
                        </TextBox>
                        {categorys.map(category => (
                            <ProgressCardPhoto 
                                key={category.id}
                                categoryId={category.id}
                                userName={viewUser}
                                anotherPage={anotherPage}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        );
    }
};

Progress.propTypes = {
    postId: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
};

export default Progress;