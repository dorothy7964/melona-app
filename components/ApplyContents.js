import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import SwitchPaper from "./SwitchPaper";
import { APPLY_CONTENTS } from "../SharedQueries";
        
const Container = styled.View`
    padding: 5px 45px;
`;
        
const ContentContainer = styled.View``;

const Bold = styled.Text`
    font-size: 15px;
    font-weight: 500;
`;

const ApplyContents = ({ 
    categoryId,
    userName
}) => {
    const { data, loading } = useQuery(APPLY_CONTENTS, {
        variables: { categoryId, userName }
    });
    if (loading === true){
        return <Loader />

    } else if (!loading && data && data.applyContents) {
        const { applyContents } = data;

        return (
            <Container>
                {applyContents.map(contents => (
                    <ContentContainer key={contents.id}>
                        <Bold>{`+ ${contents.category.text}`}</Bold>
                            <SwitchPaper 
                                type="ApplyContents"
                                contentId={contents.id}
                                contentText={contents.text}
                                contentCheck={contents.confirmCheck}
                            />
                    </ContentContainer>
                ))}
            </Container>
        );
    }
};

ApplyContents.propTypes = {
    categoryId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};

export default ApplyContents;