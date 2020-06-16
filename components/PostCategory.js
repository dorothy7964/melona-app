import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavIcon from "./NavIcon";

const Container = styled.View`
    margin-top: 10px;
    margin-left: 50px;
`;

const CategoryBox = styled.View`
    margin-bottom: 15px;
`;

const ContentsBox = styled.View`
    flex-direction: row;
    margin-top: 10px;
    margin-left: 10px;
`;

const Bold = styled.Text`
    margin-left: 10px;
    font-size: 15px;
    font-weight: 500;
`;

const ContentText = styled.Text`
    margin-left: 10px;
`;

const PostCategory = ({
    anotherPage,
    categorys
}) => (
    <Container>
        {categorys &&
            categorys.map(category => (
                <CategoryBox key={category.id}>
                    <Bold>{`+ ${category.text}`}</Bold>
                    {anotherPage && category.contents.map(content => (
                        <ContentsBox key={content.id}>
                            <NavIcon
                                size={20}
                                name={Platform.OS === "ios" 
                                    ? "ios-checkbox-outline" 
                                    : "md-checkbox-outline"
                                }
                            />
                            <ContentText>{content.text}</ContentText> 
                        </ContentsBox>
                    ))}
                </CategoryBox>
        ))}
    </Container>
);

PostCategory.propTypes = {
    anotherPage: PropTypes.bool.isRequired,
    categorys: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            contents: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    text: PropTypes.string
                })
            )
        })
    ).isRequired,
};

export default PostCategory;