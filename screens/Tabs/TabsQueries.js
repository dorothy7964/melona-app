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
