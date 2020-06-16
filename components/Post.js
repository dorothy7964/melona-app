import React from "react";
import { Card } from 'react-native-paper';
import styled from "styled-components";
import PropTypes from "prop-types";
import UserCard from "./UserCard";

const Container = styled(Card)`
    margin: 15px;
    padding: 15px;
`;

const Post = ({ 
    user,
    location,
    lastDate,
}) => (
    <Container>
        <Card.Content>
            <UserCard 
                avatar={user.avatar}
                userName={user.userName}
                location={location}
                lastDate={lastDate}
            />
        </Card.Content>
    </Container>
);

Post.propTypes = {
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    lastDate : PropTypes.string.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
    }).isRequired,
};

// Post.propTypes = {
//     id: PropTypes.string.isRequired,
//     location: PropTypes.string,
//     caption: PropTypes.string.isRequired,
//     user: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         avatar: PropTypes.string,
//         userName: PropTypes.string.isRequired
//     }).isRequired,
//     files: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             url: PropTypes.string.isRequired
//         })
//     ).isRequired,
//     comments: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             text: PropTypes.string.isRequired,
//             user: PropTypes.shape({
//                 id: PropTypes.string.isRequired,
//                 userName: PropTypes.string.isRequired
//             }).isRequired
//         })
//     ).isRequired,
//     isLiked: PropTypes.bool.isRequired,
//     likeCount: PropTypes.number.isRequired,
//     createdAt: PropTypes.string.isRequired
// };

export default Post;