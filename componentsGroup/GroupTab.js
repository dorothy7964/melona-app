import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
    flex-direction: row;
    margin: 0 15px;
`;

const ImageBoxLeft = styled.TouchableOpacity`
    margin: 0 auto;
    padding: 0 7px;
    background-color: ${
        props => props.routeTab === "daddy" 
            ? "#fff" 
            : "#ddd"
    };
`;

const ImageBoxRight = styled.TouchableOpacity`
    margin: 0 auto;
    padding: 0 7px;
    background-color: ${
        props => props.routeTab === "daddy" 
            ? "#ddd" 
            : "#fff"
    };
`;

const Image = styled.Image`
    width: 170px;
    height: 80px;
`;

const GroupTab = ({
    routeTab,
    setRouteTab
}) => (
    <Container>
        <ImageBoxLeft 
            onPress={() => setRouteTab("daddy")}
            routeTab={routeTab}
        >
            <Image
                resizeMode={"contain"}
                source={require('../assets/daddyTab.png')}
            />
        
        </ImageBoxLeft>
        <ImageBoxRight 
            onPress={() => setRouteTab("daughter")}
            routeTab={routeTab}
        >
            <Image 
                resizeMode={"contain"}
                source={require('../assets/daughterTab.png')}
            />
        </ImageBoxRight>
    </Container>
);

GroupTab.propTypes = {
    routeTab: PropTypes.string.isRequired,
    setRouteTab: PropTypes.func.isRequired,
};

export default GroupTab;
