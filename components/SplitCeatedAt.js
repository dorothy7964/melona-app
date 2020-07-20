import moment from 'moment';

export default ({ createAt }) => {
    const momentDate = moment(createAt).format("YYYY-MM-DDTHH:mm:ssZ");
    const momentDateSplit = momentDate.split("T");
    const date = momentDateSplit[0];
    
    return date;
};