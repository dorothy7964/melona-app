import React, { useState } from "react";
import { Checkbox } from 'react-native-paper';
import styles from "../styles";

export default ({ userName, checkUserArr, checkColor }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = (userName) => {
        setChecked(!checked);

        if (!checked === true) {
            if (checkUserArr.length === 0) {
                // 배열이 비었을 경우 원소 추가
                checkUserArr.push(userName);
                return;

            } else {
                // 배열 안에 넣으려는 원소가 존재 여부 확인 후 원소 추가
                if (checkUserArr.indexOf(userName) === 1) {
                    return;
                } else {
                    checkUserArr.push(userName);
                    return;
                };
            }
        } else {
            // 배열 원소 제거
            checkUserArr.splice(checkUserArr.indexOf(userName),1);
            return;
        }
    };

    return (
        <Checkbox
            color={checkColor === "default" ? styles.melonaColor : styles.redColor}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => handleToggle(userName)}
        />
    );
};