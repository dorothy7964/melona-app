import React, { useState } from "react";
import { Text } from "react-native";
import { Checkbox } from 'react-native-paper';
import styled from "styled-components";
import styles from "../styles";

const CheckContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`;

export default ({ category, categoryText }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = (category) => {
        setChecked(!checked);

        if (!checked === true) {
            if (categoryText.length === 0) {
                // 배열이 비었을 경우 원소 추가
                categoryText.push(category);
                return;

            } else {
                // 배열 안에 넣으려는 원소가 존재 여부 확인 후 원소 추가
                if (categoryText.indexOf(category) === 1) {
                    return;
                } else {
                    categoryText.push(category);
                    return;
                };
            }
        } else {
            // 배열 원소 제거
            categoryText.splice(categoryText.indexOf(category),1);
            return;
        }
    };

    return (
        <CheckContainer>
            <Checkbox
                color={styles.melonaColor}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => handleToggle(category)}
            />
            <Text>{category}</Text>
        </CheckContainer>
    );
};