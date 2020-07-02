import React from "react";
import { View } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import SwitchPaper from "./SwitchPaper";
import { VIEW_CONTENTS } from "../SharedQueries";
        
const Container = styled.View`
    padding: 5px 45px;
`;
        
const ContentContainer = styled.View``;

const ContentBox = styled.View``;

const Bold = styled.Text`
    font-size: 15px;
    font-weight: 500;
`;

const ApplyContentsMe = ({ 
    categoryId,
    categoryText,
    userName,
}) => {
    const { data, loading } = useQuery(VIEW_CONTENTS, {
        variables: { categoryId, userName }
    });
    if (loading === true){
        return <Loader />

    } else if (!loading && data && data.viewContents) {
        const { viewContents } = data;

        return (
            <Container>
                {viewContents.map(contents => (
                    <ContentContainer key={contents.id}>
                        {contents.contentsReqs.map(contentsReqs => (
                            <View key={contentsReqs.id}>
                                {userName === contentsReqs.user.userName &&
                                    contents.text !== "" && (
                                        <ContentBox>
                                            <Bold>{`+ ${categoryText}`}</Bold>
                                            <SwitchPaper 
                                                type="viewContents"
                                                contentText={contents.text}
                                                contentId={contentsReqs.id}
                                                contentCheck={contentsReqs.confirmCheck}
                                            />
                                        </ContentBox>
                                    )
                                }
                            </View>
                        ))}
                    </ContentContainer>
                ))}
            </Container>
        );
    }
};

ApplyContentsMe.propTypes = {
    categoryId: PropTypes.string.isRequired,
    categoryText: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};

export default ApplyContentsMe;