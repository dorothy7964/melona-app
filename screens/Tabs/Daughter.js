import React from "react";
import styled from "styled-components";
import FABgroup from "../../components/FABgroup";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default () => (
    <View>
        <Text>Daughter</Text>
        <FABgroup 
            text="올 때 사다줘 확인"
            select="Apply" 
            SearcheSelect="DaughterSearch"
            writeSelect="DaughterWrite"
        />
    </View>
);