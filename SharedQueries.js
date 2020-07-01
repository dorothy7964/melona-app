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

// SwitchPaper
export const TOGGLECHECKCONFIRM_CONTENTS = gql`
    mutation toggleCheckConfirmContents ($contentId: String!) {
        toggleCheckConfirmContents (contentId: $contentId)
    }
`;

// ViewApply
export const DELETE_POST = gql`
    mutation deletePost ($postId: String!) {
        deletePost (postId: $postId)
    }
`;

// ViewApply
export const TOGGLE_VIEWAPPLY = gql`
    mutation toggleViewApply ($postId: String!) {
        toggleViewApply (postId: $postId)
    }
`;

// ApplyContents
export const TOGGLECHECK_APPLY = gql`
    mutation toggleReadCheck ($applyId: String!) {
        toggleReadCheck (applyId: $applyId)
    }
`;

// ApplyContents
export const APPLY_CONTENTS = gql`
    query applyContents ($categoryId: String! $userName: String! ) {
        applyContents (categoryId: $categoryId, userName: $userName) {
            id
            text
            confirmCheck
            category {
                text
            }
        }
    }
`;

// ProgressApply
export const CATEGORY_CONTENTS = gql`
    query categoryContents ($categoryId: String! $userName: String! $anotherPage: Boolean!) {
        categoryContents (categoryId: $categoryId, userName: $userName, anotherPage: $anotherPage) {
            id
            text
            check
            confirmCheck
            confirmFile
            confirmProgress
            category {
                id
                text
            }
            contentsReqs {
                id
                confirmCheck
                confirmProgress
                    user {
                        id
                        avatar
                        userName
                    }
            }
        }
    }
`;

// ProgressSteppers
export const PROGRESS_NUM = gql`
    mutation progressNum (
        $contentId: String! 
        $stepNum: Int! 
        $anotherPage: Boolean!
    ) {
        progressNum (
            contentId: $contentId, 
            stepNum: $stepNum,
            anotherPage: $anotherPage
        )
    }
`;

// ProgressCardUser
export const PROGRESS_APPLY = gql`
    mutation progressApply ($postId: String! $userName: String!) {
        progressApply (postId: $postId, userName: $userName)
    }
`;

// ProgressStap
export const ME = gql`
    query me {
        me {
            userName
        }
    }
`;