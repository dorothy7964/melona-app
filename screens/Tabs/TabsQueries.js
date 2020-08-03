import { gql } from "apollo-boost";

// Daddy
export const SEE_BUY = gql`
query seeBuy ($items: Int $pageNumber: Int) {
    seeBuy (items: $items, pageNumber: $pageNumber) {
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

// Daughter
export const SEE_BUYME = gql`
    query seeBuyMe ($items: Int $pageNumber: Int) {
        seeBuyMe (items: $items, pageNumber: $pageNumber) {
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

// Group
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

// profile
export const ME = gql`
    query me {
        me {
            id
            email
            avatar
            userName
        }
    }
`;

// profile
export const EDIT_USER = gql`
    mutation editUser ($userName: String $email: String) {
        editUser (userName: $userName, email: $email) {
            id
            userName
            email
        }
    }
`;

// profile
export const EDIT_PASSWORD = gql`
    mutation editPassword ($password: String!) {
        editPassword (password: $password)
    }
`;