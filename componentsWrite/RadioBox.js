import React, { useState } from "react";
import { Text } from "react-native";
import { RadioButton } from 'react-native-paper';
import styled from "styled-components";
import styles from "../styles";
import { categoryArray } from "../hooks/Category";

const CheckContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`;

export default ({ categoryText, setCategoryText }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = (category) => {
        setChecked(!checked);
        setCategoryText(category);
    };

    return (
        categoryArray.map(category => (
            <CheckContainer key={category}>
                <RadioButton
                    value={category}
                    color={styles.melonaColor}
                    status={ category === categoryText ? 'checked' : 'unchecked' }
                    onPress={() => handleToggle(category)}
                />
                <Text>{category}</Text>
            </CheckContainer>
        ))
    );
};