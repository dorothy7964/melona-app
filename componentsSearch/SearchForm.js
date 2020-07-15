import React from "react";
import { Card } from "react-native-paper";
import styled from "styled-components";
import PropTypes from "prop-types"; 
import TextInputPaper from "../components/TextInputPaper";
import ButtonPaper from "../components/ButtonPaper";
import useInput from "../hooks/useInput";

const Container = styled(Card)`
    margin: 15px; 
`;

const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
`;

const ButtonBox = styled.View`
    margin-left: 20px;
`;

const TitleContainer = styled.View`
    margin-top: 10px;
    align-items: center;
`;

const Title = styled.Text`
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: 600;
`;

const SearchForm = ({ postLoading, handleSubmit }) => {
    const searchInput = useInput("");

    const handleConfirm = (term) => {
        handleSubmit(term);
        searchInput.setValue("");
    };

    return (
        <Container>
            <Card.Content>
                <TitleContainer>
                    <Title>유저이름 · 지역 · 돌아오는 날짜 · 카테고리 검색</Title>
                </TitleContainer>
                <InputContainer>
                    <TextInputPaper
                        { ...searchInput }
                        placeholder="작성 해주세요."
                    />
                    <ButtonBox>
                        <ButtonPaper
                            widthSize="constants.width / 5"
                            onPress={() => handleConfirm(searchInput.value)}
                            text="검색"
                            loading={postLoading}
                        />
                    </ButtonBox>
                </InputContainer>
            </Card.Content>
        </Container>
    );
};

SearchForm.propTypes = {
    postLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default SearchForm;