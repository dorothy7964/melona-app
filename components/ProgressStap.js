import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import UserCard from "./UserCard";
import ProgressCardUser from "./ProgressCardUser";
import { SEE_BUY_ONE, ME } from "../SharedQueries";

const Touchable = styled.TouchableOpacity``;

const Container = styled(Card)`
    margin: 25px 10px;
`;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: 15px;
`;

const ProgressStap = ({ 
    postId,
    handleRoute
}) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data: dataMe, loading: lodingMe } = useQuery(ME);
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

    if (loading === true || lodingMe === true){
        return <Loader />

    } else if (
        !loading && data && data.seeBuyOne &&
        !lodingMe && dataMe && dataMe.me 
    ) {
        const { 
            seeBuyOne: {
                user: {
                    avatar,
                    userName,
                    isSelf
                },
                applysReadCount,
                location,
                lastDate,
                categorys,
                anotherPage,
                isProgress
            }
        } = data;

        const {
            me: {
                userName: userNameMe
            }
        } = dataMe;

        return(
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
                <ProgressCardUser 
                    isSelf={isSelf}
                    postId={postId}
                    userName={userNameMe}
                    categorys={categorys}
                    anotherPage={anotherPage}
                    isProgress={isProgress}
                    handleRoute={handleRoute}
                />
            </ScrollView>
        );
    }
};

ProgressStap.propTypes = {
    postId: PropTypes.string.isRequired,
    handleRoute: PropTypes.func.isRequired,
};

export default ProgressStap;