import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import "moment-timezone";

const Container = styled.View`
    display: flex;
    align-items: center;
`;

export default ({ setLastDate }) => {
    // today - use minDate
    const momentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ssZ");
    const momentDateSplit = momentDate.split("T");
    const today = momentDateSplit[0];
    // get year - use maxDate
    const yearDate =  moment().tz("Asia/Seoul").format("YYYY");
    
    const [date, setDate] = useState(today);

    const handlePushDate = (obj) => {
        setDate(obj.date);
        setLastDate(obj.date);
    };

    return (
        <Container>
            <DatePicker
                locale="ko"
                style={{width: 200}}
                date={date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={today}
                maxDate={`${yearDate}-12-31`}
                confirmBtnText="확인"
                cancelBtnText="취소"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={(date) => { 
                    handlePushDate({ date: date })
                }}
            />
        </Container>
   );
};