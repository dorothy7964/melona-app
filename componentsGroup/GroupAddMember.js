import React from "react";
import { View } from "react-native";
import { useQuery } from 'react-apollo-hooks';
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../components/Loader";
import AvatarPaper from "../components/AvatarPaper";
import PlusCheck from "./PlusCheck";
import { SEE_FOLLOWING } from "./GroupQueries";

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
`;

const BoldMargin = styled.Text`
    font-size: 15px;
    font-weight: 600;
    margin: 0 10px;
    flex: 1;
`;

const GroupAddMember = ({ 
    memberView,
    userMember,
}) => {
    const { data, loading } = useQuery(SEE_FOLLOWING);
    
    if (loading === true) {
        return <Loader />;

    } else if (!loading && memberView === false) {
        return <View />;

    } else if (
        memberView === true &&
        !loading && data && data.seeFollowing
    ) {
        const { seeFollowing } = data;

        return (
            <View>
                {seeFollowing.map((user) => (
                    <Container key={user.id}>
                        <AvatarPaper 
                            avatar={user.avatar}
                        />
                        <BoldMargin>{user.userName}</BoldMargin>
                        <PlusCheck
                            key={user.id}
                            userName={user.userName}
                            checkUserArr={userMember}
                            checkColor="default"
                        />
                    </Container>
                ))}
            </View>
        );
    }
};

GroupAddMember.propTypes = {
    memberView: PropTypes.bool.isRequired,
    userMember: PropTypes.array.isRequired,
};

export default GroupAddMember; 