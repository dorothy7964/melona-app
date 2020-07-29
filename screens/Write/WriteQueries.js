import { gql } from "apollo-boost";

// DaddyWrite
export const CREATE_BUY = gql`
    mutation createBuy (
        $location: String! 
        $lastDate: String! 
        $categoryText: [String!]!
    ){
        createBuy (
            location: $location, 
            lastDate: $lastDate, 
            categoryText: $categoryText
        )
    }
`;

// DaughterWrite
export const CREATE_BUYME = gql`
    mutation createBuyMe (
        $location: String! 
        $lastDate: String! 
        $categoryText: String!
        $contentText: String!
        ) {
        createBuyMe (
            location: $location, 
            lastDate: $lastDate, 
            categoryText: $categoryText
            contentText: $contentText
        ) {
            id
            text
            category {
                id
                text
                post {
                    id
                }
            }
        }
    }
`;

// DaughterWrite
export const CONNECT_CONTENTS = gql`
    mutation coonnectContents ($text: String! $categoryId: String!) {
        coonnectContents (text: $text, categoryId: $categoryId)
    }
`;

// DaughterWrite
export const CREATE_CONTENTS = gql`
    mutation createContents (
        $postId: String! 
        $categoryText: String! 
        $contentText: String!
    ) {
        createContents (
            postId: $postId, 
            categoryText: $categoryText, 
            contentText: $contentText
        ){
            id
            text 
            category {
                id
            }
        }
    }
`;

// GroupAdd
export const CREATE_GROUPROOM = gql`
    mutation createGroupRoom (
        $coverPhoto: String 
        $roomName: String! 
        $userName: [String!]!
    ) {
        createGroupRoom (
            coverPhoto: $coverPhoto, 
            roomName: $roomName,
            userName: $userName
        )
    }
`;