import React from "react";
import { Text } from "react-native";
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
    borderTopWidth: 1px;
    borderTopColor: ${props => props.theme.lightGreyColor};
    padding-top: 25px;
    margin-top: 30px;
`;

const ButtonContainer = styled.View`
    width: 50%;
    align-items: center;
    borderRightWidth: 1px;
    borderRightColor: ${props => props.firstButton 
        ? props.theme.lightGreyColor
        : '#fff'
    };
`;

const Touchable = styled.TouchableOpacity``;

const Post = ({ 
    id,
    user,
    applysCount,
    location,
    lastDate,
    anotherPage,
    categorys,
    viewApply,
    isApply,
    isApplyWait,
    isApplyReadCheck,
    handleRoute
}) => (
    <Container>
        <Card.Content>
            <UserCard 
                avatar={user.avatar}
                userName={user.userName}
                applysCount={applysCount}
                location={location}
                lastDate={lastDate}
            />
            <PostCategory 
                anotherPage={anotherPage}
                categorys={categorys}
            />
            <ButtonBox>
                <ButtonContainer firstButton={true}> 
                    {user.isSelf
                        ?   <PostViewBox 
                                postId={id}
                                viewApply={viewApply}
                                anotherPage={anotherPage}
                                handleRoute={handleRoute}
                            />
                        :   <PostApplyBox 
                                postId={id}
                                anotherPage={anotherPage}
                                isApply={isApply}
                                isApplyWait={isApplyWait}
                                isApplyReadCheck={isApplyReadCheck}
                                handleRoute={handleRoute}
                            />
                    }
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
    applysCount: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    lastDate: PropTypes.string.isRequired,
    anotherPage: PropTypes.bool.isRequired,
    categorys: PropTypes.array.isRequired,
    viewApply: PropTypes.bool.isRequired,
    isApplyWait: PropTypes.bool.isRequired,
    isApplyReadCheck: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        isSelf: PropTypes.bool.isRequired
    }).isRequired,
    handleRoute: PropTypes.func.isRequired
};

export default Post;