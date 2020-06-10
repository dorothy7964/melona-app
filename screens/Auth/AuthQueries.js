import { gql } from "apollo-boost";

export const LOG_IN = gql`
    mutation confirmPassword($email: String! $password: String!) {
        confirmPassword(email: $email, password: $password)
    }
`;

export const REQUEST_SECRET = gql`
    mutation requestSecret($email: String!) {
        requestSecret(email: $email)
    }
`;