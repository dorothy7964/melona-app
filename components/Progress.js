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
        refetch();
    };

    const handleRouteBack = (route) => {
        if (route === "post") {
            return handleRoute("post", "");

        } else if (route === "user") {
            return setView("post")

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
            </ScrollView>
        );
    }
};

Progress.propTypes = {
    postId: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
};

export default Progress;