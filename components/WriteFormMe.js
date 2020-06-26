import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SwitchPaper from "./SwitchPaper";

const Container = styled.View`
    padding: 10px 45px;
`;

const CategoryBox = styled.View``;

const ContentsBox = styled.View``;

const Bold = styled.Text`
    font-size: 15px;
    font-weight: 500;
`;

const WriteFormMe = ({ postId, category }) => (
    <Container>
        <Bold>{`+ ${category.text}`}</Bold>
        <CategoryBox>
            {category.contents.map(content => (
                <ContentsBox key={content.id}>
                    <SwitchPaper 
                        key={content.id}
                        type="WriteFormMe"
                        postId={postId}
                        contentId={content.id}
                        contentText={content.text}
                    />
                </ContentsBox>
            ))}
        </CategoryBox>
    </Container>
);

WriteFormMe.propTypes = {
    postId: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
};

export default WriteFormMe;