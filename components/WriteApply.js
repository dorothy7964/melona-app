import React from "react";
import styled from "styled-components";
import { Platform, View, Text } from "react-native";
import { Card } from 'react-native-paper';
import { useQuery } from "react-apollo-hooks";
import { SEE_BUY_ONE } from "../screens/Tabs/TabsQueries";
import Loader from "./Loader";
import NavIcon from "./NavIcon";
import UserCard from "./UserCard";
import WriteForm from "./WriteForm";
import WriteFormMe from "./WriteFormMe";

const Touchable = styled.TouchableOpacity``;

const BackButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: 15px;
`;

const Container = styled(Card)`
    margin: 20px 10px;
`;

const CategoryContainer = styled(Card)`
    margin: 0 10px;
    margin-bottom: 20px;
`;

const WriteApply = ({postId, handleRoute,}) => {
    const { data, loading } = useQuery(SEE_BUY_ONE, {
        variables: { postId }
    });

    const { 
        seeBuyOne: {
            user: {
                avatar,
                userName
            },
            applysCount,
            location,
            lastDate,
            categorys,
            anotherPage
        }
     } = data;

    return (
        <View>
            <Touchable onPress={() => handleRoute("post", "")}>
                <BackButtonContainer>
                    <NavIcon
                        focused={false}
                        name={Platform.OS === "ios" 
                            ? "ios-arrow-back" 
                            : "md-arrow-back"
                        }
                    />
                </BackButtonContainer>
            </Touchable>
            {loading
                ?   <Loader /> 
                :   (<View>
                        <Container>
                            <Card.Content>
                                <UserCard 
                                    avatar={avatar}
                                    userName={userName}
                                    applysCount={applysCount}
                                    location={location}
                                    lastDate={lastDate}
                                />
                            </Card.Content>
                        </Container>
                        {categorys.map(category =>  (
                            <CategoryContainer key={category.id}>
                                <Card.Content>
                                    <Text>
                                       {`+ ${category.text}`} 
                                    </Text>
                                    {!anotherPage
                                        ?   <WriteForm />
                                        :   <WriteFormMe />
                                    }
                                </Card.Content>
                            </CategoryContainer>
                        ))}
                    </View>
                )
            }
        </View>
    );
};

export default WriteApply;