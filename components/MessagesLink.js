import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity`
    padding-right: 20px;
`;

const Text = styled.Text``;

export default () => {
    const navigation = useNavigation();

    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
            <Text>Message</Text>
        </Container>
    );
};