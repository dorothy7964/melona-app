import React, { useEffect } from "react";
import { View } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import ProgressSteppers from "./ProgressSteppers";
import ProgressView from "./ProgressView";
import { CATEGORY_CONTENTS } from "../SharedQueries";

const Wrapper = styled.View`
    margin-bottom: 25px;
`;

const Container = styled(Card)`
    margin: 5px 10px;
`;

const ContentBox = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const Bold = styled.Text`
    font-weight: 500;
    margin-right: 10px;
    font-size: 17px;
`;

const Text = styled.Text`
    font-size: 17px;
`;

const ProgressApply = ({ 
    categoryId,
    userName,
    anotherPage,
    isSelf
}) => {
    const { data, loading, refetch } = useQuery(CATEGORY_CONTENTS, {
        variables: { categoryId, userName, anotherPage }
    });

    useEffect(() => {
        refetch();
    }, []);

    if (loading === true){
        return <Loader />;
        
    } else if (!loading && data && data.categoryContents) {
        const { categoryContents } = data;

        return (
            <View>
                {categoryContents.map(contents => (
                    <Wrapper key={contents.id}>
                        <Container>
                            <Card.Content>
                                <ContentBox>
                                    <Bold>{contents.category.text}</Bold>
                                    <Text>{contents.text}</Text>
                                </ContentBox>
                            </Card.Content>
                        </Container>
                        <Container>
                            <Card.Content>
                                {!anotherPage
                                    ?   isSelf 
                                        ?   <ProgressSteppers 
                                                stepNum={contents.confirmProgress}
                                                contentId={contents.id}
                                                anotherPage={anotherPage}
                                                confirmFile={contents.confirmFile}
                                            />
                                        :   <ProgressView
                                                stepNum={contents.confirmProgress}
                                                categoryText={contents.category.text}
                                                contentText={contents.text}
                                                confirmFile={contents.confirmFile}
                                            />
                                    :   isSelf 
                                        ?   contents.contentsReqs.map(contentsReqs => (
                                                userName === contentsReqs.user.userName &&
                                                <ProgressView 
                                                    key={contentsReqs.id}
                                                    stepNum={contentsReqs.confirmProgress}
                                                    categoryText={contents.category.text}
                                                    contentText={contents.text}
                                                    confirmFile={contentsReqs.confirmFile}
                                                />
                                            ))
                                        :   contents.contentsReqs.map(contentsReqs => (
                                                userName === contentsReqs.user.userName &&
                                                <ProgressSteppers 
                                                    key={contentsReqs.id}
                                                    contentId={contentsReqs.id}
                                                    stepNum={contentsReqs.confirmProgress}
                                                    anotherPage={anotherPage}
                                                    categoryText={contents.category.text}
                                                    contentText={contents.text}
                                                    confirmFile={contentsReqs.confirmFile}
                                                    contentsReqs={contentsReqs}
                                                />
                                            ))
                                }
                            </Card.Content>
                        </Container>
                    </Wrapper>
                ))}
            </View>
        );
    }
};

ProgressApply.propTypes = {
    categoryId: PropTypes.string,
    userName: PropTypes.string,
    anotherPage: PropTypes.bool,
    isSelf: PropTypes.bool.isRequired,
};

export default ProgressApply;