import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "../styles";

const Text = styled.Text`
    color: ${props => props.color};
    font-size: 12px;
`;

const NavText = ({
    focused = true,
    text,
    color = styles.melonaColor,
}) => (
    <Text color={`${focused ? color : styles.darkGreyColor}`}>
        {text}
    </Text>
);
NavText.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    focused: PropTypes.bool
};

export default NavText;