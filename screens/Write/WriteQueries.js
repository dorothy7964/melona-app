import { gql } from "apollo-boost";

// DaddyWrite
export const CREATE_BUY = gql`
    mutation createBuy (
        $location: String! 
        $lastDate: String! 
        $categoryText: [String!]!
    ){
        createBuy (
            location: $location, 
            lastDate: $lastDate, 
            categoryText: $categoryText
        )
    }
`;