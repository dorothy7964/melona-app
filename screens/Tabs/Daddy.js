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
        <Text>Daddy</Text>
        <FABgroup 
            text="갈 때 사갈게 확인"
            select="Buy" 
            SearcheSelect="DaddySearch"
            writeSelect="DaddyWrite"
        />
    </View>
);