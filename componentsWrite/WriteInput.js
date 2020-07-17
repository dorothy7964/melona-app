import React from "react";
import styled from "styled-components";
import TextInputPaper from "../components/TextInputPaper";

const Container = styled.View`
    display: flex;
    align-items: center;
`;

export default ({ inputValue }) => (
    <Container>
        <TextInputPaper
            { ...inputValue }
            placeholder="작성 해주세요."
        />
    </Container>
);