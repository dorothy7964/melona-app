import { gql } from "apollo-boost";

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