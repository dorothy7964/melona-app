import { gql } from "apollo-boost";

// DaddySearch
export const SEARCH_POST = gql`
    query searchPost ($term: String!) {
        searchPost (term: $term) {
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

// DaughterSearch
export const SEARCHME_POST = gql`
    query searchMePost ($term: String!) {
        searchMePost (term: $term) {
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
                contents {
                    id
                    text
                    check
                }
            }
        }
    }
`;

// SearchGroupPost
export const SEARCH_POST_GROUP = gql`
    query searchPostGroup ($term: String! $groupRoomId: String!) {
        searchPostGroup (term: $term, groupRoomId: $groupRoomId) {
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

// SearchGroupPost
export const SEARCHME_POST_GROUP = gql`
    query searchMePostGroup ($term: String! $groupRoomId: String!) {
        searchMePostGroup (term: $term, groupRoomId: $groupRoomId) {
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
                contents {
                    id
                    text
                    check
                }
            }
        }
    }
`;

// FriendSearch
export const SEARCH_USER = gql`
    query searchUser ($term: String!) {
        searchUser (term: $term) {
            id
            avatar
            userName
            isFollowing
        }
    }
`;

