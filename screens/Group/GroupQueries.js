import { gql } from "apollo-boost";

// RoomCard
export const ALL_GROUPROOM = gql`
    query allGroupRoom {
        allGroupRoom {
            id
            roomName
            coverPhoto
            createdAt
            founderUser {
                isSelf
                userName
            }
            groupRoomMember {
                id
                participants {
                    id
                    avatar
                    userName
                }
            }
        }
    }
`;

// RoomPost
export const SEE_GROUPROOM = gql`
    query seeGroupRoom ($groupRoomId: String!) {
        seeGroupRoom (groupRoomId: $groupRoomId) {
            id
            roomName
            coverPhoto
            createdAt
            founderUser {
                avatar
                userName
            }
            groupRoomMember {
                id
                participants {
                    id
                    avatar
                    userName
                }
            }
        }
        me {
            userName
        }
    }
`;

// GroupDaddy, GroupDaughter
export const items = 4;

// GroupDaddy, RoomPost, DaddyGroupWrite
export const SEEBUY_GROUP = gql`
    query seeBuyGroup (
        $groupRoomId: String! 
        $items: Int 
        $pageNumber: Int
    ) {
        seeBuyGroup (
            groupRoomId: $groupRoomId,
            items: $items, 
            pageNumber: $pageNumber
        ) {
            id
            location
            lastDate
            isApply
            isApplyWait
            isApplyReadCheck
            applysCount
            commentCount
            viewApply
            anotherPage
            applys {
                id
                apply
                readCheck
                user {
                    userName
                    avatar
                }
            }
            user {
                userName
                avatar
                isSelf
        }
            categorys {
                id
                text
            }
        }
    }
`;

// GroupDaughter, RoomPost, DaughterGroupWrite
export const SEEBUYME_GROUP = gql`
    query seeBuyMeGroup (
        $groupRoomId: String! 
        $items: Int 
        $pageNumber: Int
    ) {
        seeBuyMeGroup (
            groupRoomId: $groupRoomId,
            items: $items, 
            pageNumber: $pageNumber
        ) {
            id
            location
            lastDate
            isApply
            isApplyWait
            isApplyReadCheck
            isProgress
            applysCount
            commentCount
            viewApply
            anotherPage
            applys {
                id
                apply
                readCheck
                progress
                user {
                    userName
                    avatar
                }
            }
            user {
                userName
                avatar
                isSelf
           }
            categorys {
                id
                text
                contents {
                    id
                    text
                    check
                }
            }
        }
    }
`;

// DaddyGroupWrite
export const CREATE_BUY_GROUP = gql`
    mutation createBuyGroup (
        $groupRoomId: String! 
        $location: String! 
        $lastDate: String! 
        $categoryText: [String!]!
    ){
        createBuyGroup (
            groupRoomId: $groupRoomId, 
            location: $location, 
            lastDate: $lastDate, 
            categoryText: $categoryText
        )
    }
`;

// DaughterGroupWrite
export const CREATE_BUYME_GROUP = gql`
    mutation createBuyMeGroup (
        $groupRoomId: String! 
        $location: String! 
        $lastDate: String! 
        $categoryText: String!
        $contentText: String!
        ) {
        createBuyMeGroup (
            groupRoomId: $groupRoomId, 
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

// DaughterGroupWrite
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

// DaughterGroupWrite
export const CONNECT_CONTENTS = gql`
    mutation coonnectContents ($text: String! $categoryId: String!) {
        coonnectContents (text: $text, categoryId: $categoryId)
    }
`;