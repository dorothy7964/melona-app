import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";

const SEE_BUY = gql`
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

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const { data, loading } = useQuery(SEE_BUY);
    console.log("loading, data", loading, data);
    return <View>{loading? <Loader /> : null}</View>;
};