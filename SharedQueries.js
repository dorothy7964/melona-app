import { gql } from "apollo-boost";

// WriteApply
export const SEE_BUY_ONE = gql`
    query seeBuyOne ($postId: String!) {
        seeBuyOne (postId: $postId) {
            id
            location
            lastDate
            isApply
            isApplyWait
            isApplyReadCheck
            applysCount
            applysReadCount
            commentCount
            viewApply
            anotherPage
            groupRoom
            comments {
                id
                text
            }
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
            applysRead {
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
                    contentsReqs {
                        id
                        check
                        user {
                            userName
                        }
                    }
                }
            }
        }
    }
`;

// WriteForm
export const CONNECT_CONTNETS = gql`
    mutation coonnectContents ($text: String! $categoryId: String!) {
        coonnectContents (text: $text, categoryId: $categoryId)
    }
`;

export const CONNECT_APPLY = gql`
    mutation connectApply ($postId: String!) {
        connectApply (postId: $postId)
    }
`;

// WriteApply
export const DELETE_CONTENTS = gql`
    mutation deleteContents ($postId: String!) {
        deleteContents (postId: $postId)
    }
`;

// WriteForm
export const TRUE_APPLY = gql`
    mutation trueApply ($postId: String!) {
        trueApply (postId: $postId)
    }
`;

// WriteApply
export const FALSE_APPLY = gql`
    mutation falseApply ($postId: String!) {
        falseApply (postId: $postId)
    }
`;

// WriteApply
export const UNCONNECT_CONTENTSREQ = gql`
    mutation unConnectContentsReq ($postId: String!) {
        unConnectContentsReq (postId: $postId)
    }
`;

// SwitchPaper
export const TOGGLE_CONTENTREQ = gql`
    mutation toggleContnetsReq ($contentId: String!) {
        toggleContnetsReq (contentId: $contentId)
    }
`;
