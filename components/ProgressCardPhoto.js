import React from "react";
import { View } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "./Loader";
import { CATEGORY_CONTENTS } from "../SharedQueries";

const Container = styled(Card)`
    margin: 15px;
    padding: 25px;
`;

const ImageContainer = styled.View`
    align-items: center;
    margin-bottom: 10px;
`;

const ImageBox = styled.Image`
    borderRadius: 10;
    width: 200px;
    height: 200px;
`;

const GreyBold = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.darkGreyColor};
`;

const BlackText = styled.Text`
    font-size: 20px;
`;

const ProgressCardPhoto = ({ 
    categoryId,
    userName,
    anotherPage,
}) => {
    const { data, loading } = useQuery(CATEGORY_CONTENTS, {
        variables: { 
            categoryId,
            userName,
            anotherPage
        }
    });

    if (loading === true){
        return <Loader />;

    } else if (!loading && data && data.categoryContents) {
        const { categoryContents } = data;
        
        return(
            <View>
                {categoryContents.map(contents => (
                    <Container key={contents.id}>
                        <ImageContainer>
                            {!anotherPage
                                ?   <ImageBox 
                                        source={ contents.confirmFile === "none"
                                            ? require('../assets/confirmFileText_App.png')
                                            : { uri: `${contents.confirmFile}` }
                                        }
                                    />
                                :   contents.contentsReqs.map(contentsReqs => (
                                        userName === contentsReqs.user.userName &&
                                        <ImageBox 
                                            key={contentsReqs.id}
                                            source={ contentsReqs.confirmFile === "none"
                                                ? require('../assets/confirmFileText_App.png')
                                                : { uri: `${contentsReqs.confirmFile}` }
                                            }
                                        />
                                    ))   
                            }
                        </ImageContainer>
                        <GreyBold># {contents.category.text}</GreyBold>
                        <BlackText>{contents.text}</BlackText>
                    </Container>
                ))}
            </View>
        );
    }
};

ProgressCardPhoto.propTypes = {
    categoryId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    anotherPage: PropTypes.bool.isRequired,
};

export default ProgressCardPhoto;