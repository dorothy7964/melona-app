import React from "react";
import { Card } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import UserCard from "./UserCard";
import PostCategory from "./PostCategory";
import PostViewBox from "./PostViewBox";
import PostApplyBox from "./PostApplyBox";

const Container = styled(Card)`
    margin: 15px;
    padding: 15px;
`;

const ButtonBox = styled.View`
    flex-direction: row;
    borderTopWidth: 1;
    borderTopColor: ${props => props.theme.lightGreyColor};
    padding-top: 25px;
    margin-top: 30px;
`;

const ButtonContainer = styled.View`
    width: 50%;
    align-items: center;
    borderRightWidth: 1;
    borderRightColor: ${props => props.firstButton 
        ? props.theme.lightGreyColor
        : '#fff'
    };
`;

const Touchable = styled.TouchableOpacity``;

const Text = styled.Text``;

const Post = ({ 
    user,
    location,
    lastDate,
    anotherPage,
    categorys
}) => (
    <Container>
        <Card.Content>
            <UserCard 
                avatar={user.avatar}
                userName={user.userName}
                location={location}
                lastDate={lastDate}
            />
            <PostCategory 
                anotherPage={anotherPage}
                categorys={categorys}
            />
            <ButtonBox>
                <ButtonContainer firstButton={true}> 
                    <Touchable>
                        {user.isSelf
                            ?   <PostViewBox />
                            :   <PostApplyBox />
                        }
                        
                    </Touchable>
                </ButtonContainer>                 
                <ButtonContainer>
                    <Touchable>
                        <Text>댓글</Text>
                    </Touchable>
                </ButtonContainer>                 
            </ButtonBox>
        </Card.Content>
    </Container>
);

Post.propTypes = {
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    lastDate : PropTypes.string.isRequired,
    anotherPage : PropTypes.bool.isRequired,
    categorys : PropTypes.array.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        isSelf: PropTypes.bool.isRequired
    }).isRequired,
};

export default Post;