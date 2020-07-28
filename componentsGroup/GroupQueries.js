import { gql } from "apollo-boost";

// RoomCard
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

// GroupDaddy
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

// GroupDaughter
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

// GroupApplyRes
export const TOGGLE_POSTEDRES = gql`
    query togglePostedResGroup ($groupRoomId: String! $tab: String!) {
        togglePostedResGroup (groupRoomId: $groupRoomId tab: $tab) {
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

// GroupApplyReq
export const TOGGLE_POSTEDREQ = gql`
    query togglePostedReqGroup ($groupRoomId: String! $tab: String!) {
        togglePostedReqGroup (groupRoomId: $groupRoomId tab: $tab) {
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

// GroupCard
export const EDIT_GROUPROOM = gql`
    mutation editGroupRoom (
        $groupRoomId: String!
        $coverPhoto: String
        $roomName: String
    ) {
        editGroupRoom (
            groupRoomId: $groupRoomId
            coverPhoto: $coverPhoto
            roomName: $roomName
        )
    }
`;

// GroupUserPluseDialogPaper
export const ADDMEMBER_LIST = gql`
    query addMemberList ($userNameArr: [String!]!) {
        addMemberList (userNameArr: $userNameArr) {
            id
            avatar
            userName
        }
    }
`;

// GroupUserPlusDialogPaper
export const ADD_MEMBER= gql`
    mutation addUserMember (
        $groupMemberId: String!
        $userNameArr: [String!]!
    ) {
        addUserMember (
            groupMemberId: $groupMemberId
            userNameArr: $userNameArr
        )
    }
`;

// GroupRemoveDialogPaper
export const DELETE_MEMBER= gql`
    mutation deleteUserMember (
        $groupMemberId: String!
        $userNameArr: [String!]!
    ) {
        deleteUserMember (
            groupMemberId: $groupMemberId
            userNameArr: $userNameArr
        )
    }
`;