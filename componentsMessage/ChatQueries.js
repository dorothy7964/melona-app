import { gql } from "apollo-boost";

// ChatRoom, SendChat
export const SEE_CHATROOM = gql`
    query seeChatRoom ($id:String!){
        seeChatRoom (id: $id){
            participants {
                id
                userName
                avatar
            }
            messages {
                id
                text
                readMessage
                createdAt
                from {
                    id
                    avatar
                    userName
                }
                to {
                    id
                }
            }
        }
        me {
            id
            userName
        }
    }
`;

// SendChat
export const SEND_MESSAGE = gql`
    mutation sendMessage($chatRoomId:String, $message:String!, $userName:String) {
        sendMessage(chatRoomId: $chatRoomId message: $message userName: $userName) {
            id
            text
            createdAt
            from {
                id
                avatar
                userName
            }
            to {
                id
            }
            chatRoom {
                id
            }
        }
    }
`;

// SendChat
export const READCOUNT_MESSAGE = gql`
    mutation readcountMessage ($chatRoomId: String!){
        readcountMessage (chatRoomId: $chatRoomId)
    }
`;

// SearchCard
export const SEARCH_USER = gql`
    query searchUser ($term: String!){
        searchUser (term: $term){
            id
            avatar
            userName
            isSelf
        }
    }
`;
