import React from "react";
import styled from "styled-components";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 0 10px;
`;

const Image = styled.Image`
    width: 190px;
    height: 190px;
`;

export default ({ tab, setTab, anotherPage }) => {
    if (tab === "applyRes") {
        return (
            <Container>
                 <Touchable onPress={() => setTab("applyRes")}>
                    <Image 
                        resizeMode={"contain"}
                        source={!anotherPage
                            ? require('../assets/daddy_request_green.png')
                            : require('../assets/daughter_request_green.png')
                        }
                    />
                 </Touchable>
                <Touchable onPress={() => setTab("applyReq")}>
                    <Image 
                        resizeMode={"contain"}
                        source={!anotherPage
                            ? require('../assets/daddy_response_grey.png')
                            : require('../assets/daughter_response_grey.png')
                        }
                    />
                </Touchable>
            </Container>
        );
    } 
    
    else if (tab === "applyReq") {
        return (
            <Container>
                <Touchable onPress={() => setTab("applyRes")}>
                    <Image 
                        resizeMode={"contain"}
                        source={!anotherPage
                            ? require('../assets/daddy_request_grey.png')
                            : require('../assets/daughter_request_grey.png')
                        }
                    />
                </Touchable>
                <Touchable onPress={() => setTab("applyReq")}>
                    <Image 
                        resizeMode={"contain"}
                        source={!anotherPage
                            ? require('../assets/daddy_response_green.png')
                            : require('../assets/daughter_response_green.png')
                        }
                    />
                </Touchable>
            </Container>
        );
    }
};
