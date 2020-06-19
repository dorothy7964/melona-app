import { gql } from "apollo-boost";

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

export const SEE_BUYME = gql`
    query seeBuyMe ($items: Int $pageNumber: Int) {
        seeBuyMe (items: $items, pageNumber: $pageNumber) {
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