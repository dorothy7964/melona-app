import React from "react";
import styled from "styled-components";
// import { withNavigation } from 'react-navigation';

const Container = styled.TouchableOpacity`
    padding-right: 20px;
`;

const Text = styled.Text``;

export default () => (
    <Container>
        <Text>Message</Text>
    </Container>
);