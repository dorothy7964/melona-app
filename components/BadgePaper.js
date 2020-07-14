import React from "react";
import { Badge } from 'react-native-paper';
import styled from "styled-components";

const Badges = styled(Badge)`
    background-color: ${props => props.theme.melonaColor};
    color: #fff;
    font-weight: 600;
    position: absolute;
    top: -7px;
    right: 26px;
`;

export default ({ commentCount }) => (
    <Badges>
        {commentCount}
    </Badges>
);